title: "About"
layout: "page"
description: "Not about me, just a discrete (?) place to experiment..."
---
<img src="/css/images/logo.png" title="PhiLho's logo" alt="PhiLho"/>

<!-- toc -->

# PhiLhoSoft

So far, only some [technical slides](./Slides).
More to come...
This page is ugly on purpose... (almost).

## Technical
``` ceylon
// Testing some code display. To be highlighted later.

String defaultAsString<Element>(Element? e) => e?.string else "";

shared String formatAsNewick<Element, ActualTreeNode>(ActualTreeNode root,
		String(Element?) asString = defaultAsString<Element>)
		given ActualTreeNode satisfies TreeNode<Element, ActualTreeNode>
{
	// We need a custom iterator as we do a specific action on each step.
	class PostOrderIteration(ActualTreeNode root)
	{
		function wrap(ActualTreeNode node)
		{
			return [ node, node.children.iterator() ];
		}

		Stack<[ ActualTreeNode, Iterator<ActualTreeNode> ]> stack = LinkedList<[ ActualTreeNode, Iterator<ActualTreeNode> ]>();
		stack.push(wrap(root));

		shared void iterate(StringBuilder sb)
		{
			// Cut for shortness...
		}
	}

	value ppi = PostOrderIteration(root);
	value sb = StringBuilder();
	ppi.iterate(sb);

	return sb.string;
}
```

## Typography

<section>

### Paragraphs and lists
A simple paragraph. Followed by an ordered list (<abbr title="ordered list">OL</abbr>).

1. One
1. Two
1. Three
   Can have **paragraph** inside, too.

Then an unordered list. (<abbr title="unordered list">UL</abbr>)

- One
- Two
- Three
   Here too, can have _paragraph_ inside, too.

And a simple regular paragraph to conclude.
</section>

<section>

### Inline code

We can have code in a paragraph: `var p = _.find(persons, { name: Bond', surname: 'James' });` and even more.
</section>

<section>

### Quote
Let's try a quote:
<blockquote cite="http://ceylon-lang.org/documentation/1.2/spec/html_single/#d0e15">
Java is a simple language to learn and Java code is easy to read and understand.
Java provides a level of typesafety that is appropriate for business computing and
enables sophisticated tooling with features like refactoring support, code completion, and code navigation.
Ceylon aims to retain the overall model of Java, while getting rid of some of Java's warts,
and improving upon Java's facilities for creating abstractions and writing generic libraries and frameworks.
</blockquote>
<p>From the <cite>Ceylon Language Specification</cite></p>
</section>

<section>

### Tables
Now, with tables (thead, tfoot, and tbody)
<table>
	<caption>Caption of the table</caption>
	<thead>
		<tr>
			<th>First Header</th>
			<th>Second Header</th>
			<th>Last Header</th>
		</tr>
	</thead>
	<tfoot>
		<tr>
			<td>Footer on Left</td>
			<td>Footer on Middle</td>
			<td>Footer on Right</td>
		</tr>
	</tfoot>
	<tbody>
		<tr>
			<td>Body content 1.1</td>
			<td>Body content 2.1</td>
			<td>Body content 3.1</td>
		</tr>
		<tr>
			<td>Body content 1.2</td>
			<td>Body content 2.2</td>
			<td>Body content 3.2</td>
		</tr>
		<tr>
			<td>Body content 1.3</td>
			<td>Body content 2.3</td>
			<td>Body content 3.3</td>
		</tr>
	</tbody>
</table>
That's all for now.
</section>
