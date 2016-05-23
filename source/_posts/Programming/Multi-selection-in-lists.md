title: Multi-selection in lists
description: "How to do multi-selection in a list of items"
categories:
- Programming
- UI
tags:
- UI
- Programming
- Component
date: 2016-05-14 18:08
---

# Multi-selection in lists

Having to implement range selection in lists in an application at work, I did a little survey of what is done, and was surprised that while the bases are the same for all lists, the more advanced selection modes vary a lot.

{% img /images/Multi-selection.png "'Multi-selection in Windows Explorer" "'Multi-selection in Windows Explorer'" %}

<!-- more -->

In our AngularJS application, we often display lists of things, in the form of rows of items, spawning several columns, each column showing some specific information from the item.
For this, we use the ag-Grid component.
Sometime, we need to select several items (lines) at once.
Surprisingly, ag-Grid support, out of the box, is quite lacunar: we can select several items, one by one, with Ctrl+click.
By default, we cannot even deselect an item! We have to activate an option for that.
And we cannot do a range selection...

Fortunately, the grid has a rather rich selection API, so it is quite easy to supply the missing feature.
And in an [issue of the ag-Grid repository](https://github.com/ceolter/ag-grid/issues/369), somebody provided a base implementation of the range selection feature.

I was a bit surprised to see the implementation was a bit lacunar and doing some things in a surprising way. So I checked how it is done in a number of popular applications, and found out the implementations differed a lot! And that implementation was actually mimicking the behavior of Qt lists.

 ## A quick survey

The applications I checked are:
- The standard Windows list view component, the one I am the most familiar with. Used as SysListView32 in a number of applications, including the former Windows Explorer. This one now uses a more modern component, but still react the same.
- The list of mails in Thunderbird.
- The list of changelists in the P4V application: the Perforce visual editor, written in Qt. Not sure if it is typical of Qt in general, or if it uses an implementation specific to Perforce. Well, I found out that VLC shows its playlist in a similar component (QtWidget) and behaves the same.
- The HTML multi-selection `select` tag, showing a list: tested on latest Firefox, Chrome and in IE9-11, on Windows.

Reminder about the latter: it looks like
```
<select name="select" multiple size=10>
  <option value="v1">Value A</option>
  <option value="v2" selected>Value B</option>
  <option value="v3">Value C</option>
  ...
  <option value="v12">Value L</option>
</select></select>
```
and can be tested in sites like jsFiddle.net.

Things all lists implement the same:
- Single click: deselect all, select clicked row
- Ctrl+click: add clicked row to selection, if deselected; otherwise, remove it from the selection.

Shift+click: this is where things start to diverge! It always select the range of lines between the last click and the currently clicked row. But:
- in Windows Explorer (WExp), it starts by deselecting all other rows. Idem in the multiple select implementation of all browsers and Thunderbird.
- in Qt (Perforce / VLC), it adds the new range to the existing selection. It was also the behavior of the implementation I found.

Ctrl+Shift+click is not universally implemented. Actually, I did a little survey in a programmer group on Google+, and with over 80 answers (OK, that's not much), 20 % of them told they don't know how to use Ctrl+Shift+click...
In Qt, it just works as Shift+click.
In Thunderbird, Firefox' implementation of multiple select, and Chrome's one too, it selects the range too, but it is added to the current selection. Just like the previous ones...

In Windows Explorer and multiple select in IE, it does that, too. But not only. If your last click (a Ctrl+click, necessarily) deselected an item, then the Ctrl+Shift+click deselects the range, instead of selecting it.
It is powerful and flexible!

## Keyboard behavior

I haven't implemented yet, but I also checked the possibilities of selection with the keyboard: it is important for accessibility purpose, but it can be also useful in general.

When the list has the focus, all implementations move the selection with up & down arrows (UDA).
Likewise, all of them extends the selection from the current position with Shift+UDA.

Now, if you do Ctrl+UDA, WExp, Qt, Firefox and Thunderbird moves the focus, highlighting the current row (with focus) with a small border.
Chrome just deselects all and selects the target row, ie. it ignores the Ctrl modifier.
Curiously, IE behaves differently than WExp, for once: it keeps the selection unchanged, but moves the scrollbar (if any).

The implementations moving the focus then allows to select or deselect the current row with Ctrl+space. Or even just space in some cases.
Upon doing Ctrl+Shift+UDA, only Firefox extends the selection from the current position to the new one.
Curiously, Windows Explorer extends the selection to the new position.
Qt just move the focus.

##Implementation

The implementation is rather simple, actually.


```
 service.addShiftRangeSelect = function(gridOptions, handleCtrlShift, exclude)
{
	if (handleCtrlShift === undefined)
	{
		handleCtrlShift = true; // Let's make it the default! More powerful... :-)
	}

	service._buildPortableSelectApi(gridOptions);
	gridOptions.rowSelection = 'multiple';
	gridOptions.suppressRowClickSelection = true;
	gridOptions.onRowClicked = function(row)
	{
		if (_.isFunction(exclude) && exclude(row))
			return; // Don't handle this click (eg. on editable cells)

		if (gridOptions.customSelection.isSelected === undefined)
		{
			// One time init, use row's API to tell the version to use
			gridOptions.customSelection.selectVersion(row);
		}
		var lastSelectedRow = gridOptions.customSelection.lastSelectedRow;
		var shiftKey = row.event.shiftKey,
			ctrlKey = row.event.ctrlKey;

		// If modifier keys aren't pressed then only select the row that was clicked
		if (!shiftKey && !ctrlKey)
		{
			gridOptions.customSelection.setSelected(row.node, true, true);
			gridOptions.customSelection.select = true;
		}
		// If modifier keys are used and there was a previously selected row
		else if (lastSelectedRow !== undefined || ctrlKey && !shiftKey)
		{
			// Select a block of rows
			if (shiftKey && !ctrlKey)
			{
				if (handleCtrlShift)
				{
					gridOptions.api.deselectAll();
				}
				gridOptions.customSelection.setRangeSelected(row.rowIndex, lastSelectedRow.rowIndex, true);
				gridOptions.customSelection.select = true;
			}
			// Select one more row
			else if (ctrlKey && !shiftKey)
			{
				if (gridOptions.rowDeselection)
				{
					var select = !gridOptions.customSelection.isSelected(row.node);
					gridOptions.customSelection.setSelected(row.node, select);
					gridOptions.customSelection.select = select;
				}
				else
				{
					gridOptions.customSelection.setSelected(row.node, true);
					gridOptions.customSelection.select = true;
				}
			}
			else if (handleCtrlShift)
			{
				gridOptions.customSelection.setRangeSelected(row.rowIndex, lastSelectedRow.rowIndex, gridOptions.customSelection.select);
			}
		}
		// Store the recently clicked row for future use
		gridOptions.customSelection.lastSelectedRow = row;
	};
	gridOptions.onBeforeSortChanged = function()
	{
		// Be sure to clear out the row selections on sort change since row indexes will change
		gridOptions.api.deselectAll();
		gridOptions.customSelection.lastSelectedRow = undefined;
	};
};
```

```
service._buildPortableSelectApi = function(gridOptions)
{
	gridOptions.customSelection = {};

	gridOptions.customSelection.selectVersion = function(node)
	{
		if (node.isSelected) // v.4 specific
		{
			gridOptions.customSelection.isSelected = gridOptions.customSelection.forV4.isSelected;
			gridOptions.customSelection.setSelected = gridOptions.customSelection.forV4.setSelected;
			gridOptions.customSelection._setRangeSelected = gridOptions.customSelection.forV4._setRangeSelected;
		}
		else
		{
			gridOptions.customSelection.isSelected = gridOptions.customSelection.forV3.isSelected;
			gridOptions.customSelection.setSelected = gridOptions.customSelection.forV3.setSelected;
			gridOptions.customSelection._setRangeSelected = gridOptions.customSelection.forV3._setRangeSelected;
		}
	};

	gridOptions.customSelection.setRangeSelected = function(startIndex, endIndex, selected)
	{
		// Get our start and end indexes correct
		if (startIndex > endIndex)
		{
			var si = startIndex;
			startIndex = endIndex;
			endIndex = si;
		}
		gridOptions.customSelection._setRangeSelected(startIndex, endIndex, selected);
	};

	gridOptions.customSelection.forV4 =
	{
		isSelected: function(node) { return node.isSelected(); },
		setSelected: function(node, selected, clearSelection)
		{
			node.setSelected(selected, clearSelection);
		},
		_setRangeSelected: function(startIndex, endIndex, selected)
		{
			gridOptions.api.forEachNode(function __handleNode(node)
			{
				if (node.rowIndex >= startIndex && node.rowIndex <= endIndex)
				{
					gridOptions.api.selectNode(node, selected, node.rowIndex < endIndex);
				}
			});
		},
	};

	gridOptions.customSelection.forV3 =
	{
		isSelected: function(node) { return gridOptions.api.isNodeSelected(node); },
		setSelected: function(node, selected, clearSelection)
		{
			if (selected)
			{
				gridOptions.api.selectNode(node, !clearSelection);
			}
			else
			{
				gridOptions.api.deselectNode(node);
			}
		},
		_setRangeSelected: function(startIndex, endIndex, selected)
		{
			var operation = (selected ? gridOptions.api.selectIndex : gridOptions.api.deselectIndex).bind(gridOptions.api);
			// (De)select all the rows between the previously clicked row and the newly clicked row
			for (var i = startIndex; i <= endIndex; i++)
			{
				operation(i, true, i < endIndex); // multi & suppressEvents: on last row, we let the event to pop up
			}
		},
	};
};
```
(To be continued)

