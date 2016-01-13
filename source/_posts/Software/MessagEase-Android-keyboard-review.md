title: MessagEase (Android keyboard) review
description: a review of the MessagEase keyboard for Android
categories:
- Software
- Android
tags:
- Software
- Android
- Keyboard
date: 2015-12-17 10:56:00
---

# MessagEase (Android keyboard) review

{% img /images/MessagEase_Keyboard.png 150 150 "'My MessagEase keyboard as exported by the app'" "'MessagEase keyboard'" %}

Most Android keyboards suffer from the same flaw: they mimic traditional typewriter / computer keyboards.
The (only?) advantage is that most users are familiar with it.
The inconveniences are numerous:
- These keyboards were designed to slow down typing... (well, multi-finger typing, but still, they are not intuitive).
- People are trained / used to type with several fingers, while on Android you are limited to two, at best.
- These keyboards often lack arrow keys, Delete key and multi-key / finger combinations, like shifting to capital, Ctrl+C / Ctrl+V, Ctrl+Backspace to delete a word, etc. To reach some keys (accented chars) and go back to regular typing, you might have to type three or four keys.
- Keys are small, particularly on small phones.

I thought of a squarish / circular design around a central point, where letters surrounding it would change to make more accessible the letters more likely to follow the previous ones (for a given dictionary).
Idea with a number of caveats, like not relying on muscle memory and needing to know the context in the edited text.

So I searched alternatives (they are numerous!), tried some (disliked swipe-based ones, liked Hacker's Keyboard in its classical category) and finally stumbled upon MessagEase.
I felt it was the right one, even if I expected some learning curve... It was close of my idea, but with a fixed layout (for a given language), and it makes the most common letters easier to type than the rarest ones.

Its square design make it look huge, but in practice, with its 4x4 keys, it is not much bigger than a four row traditional keyboard. And you can easily adjust its size to fit your taste / capabilities.
It is very flexible, with tons of settings to adjust finely the look and feel of the keyboard, to adapt it to the needs and tastes of the users. Yet, it has sensible defaults, so it is good out of the box.

<!-- more -->

# Principle

{% img /images/MessagEase_screenshot.png "'MessagEase keyboard screenshot in the Jota+ editor'" "'MessagEase keyboard screenshot'" %}

The main area of the keyboard is a 3x3 square of keys. Each key (sub-square) has the nine most used letters of the chosen language (aniuortes for French, not far for English). They are typed with a simple tap on them.
The four next most used letters (hbdc) are obtained by sweeping from the central square to a side square. For the next four, the move is from the center to the corners. Then come the reverse moves, from sides or corners to center, providing the eight next letters. The last letter is obtained with a sweep between two sides. Other side to side or to corner moves provide accented letters and punctuation signs.
With some logic making them easier to memorize: lower signs (,.:;) are at the bottom of the keyboard while higher ones (`^´) are at the top, and the move follows the direction of the sign.
Numbers are obtained by a special keyboard (or a long press).
Special moves allow to easily reach capital letters: a circular move over the main letters, and a sweep and back for the others. Plus autocapitalization at the beginning of sentences.

The keyboard also provides very convenient special keys: you can cut, copy or paste with a single sweep. A side sweep on the space bar moves the caret by one character. Sweep and back to move by a whole word.
Tap on the backspace to delete the char on left of caret. Sweep to left and back to delete from caret to start of word. Sweep to right to delete the char on right of caret (idem Delete key), sweep and back to right to delete to end of word.

Some characters are obtained via a combination key: oe plus the key gives œ; << and the key gives « (French quote). Etc. `^´ keys are automatically merged if the previous letter accepts accents (eg. E and ´ gives É). Backspace cancels the merging.

There are other shortcuts, like defining sentences to enter with a special gesture, etc.

You can have an area displaying suggesting words completing the one you are typing. For your selected language, of course. You have to install the languages separately.
These are only suggestions, you can ignore them or tap on one to autocomplete the current word. No stupid autocorrection causing so often confusion, embarrassment and fun... at your depends! :-)

# Remarks

The keyboard layout is, by default, adapted to the chosen language, depending on the most often found letters of the language. But as I type as much English than French, I chose to use the same keyboard for both, because learning to use efficiently the keyboard involves memorizing the letter placements and using muscle memory. So having two keyboard layouts would be rather couter-productive (unless you have a better brain than mine...), at least for similar languages (eg. latin-based). Of course, English vs. Arabic, for example, is a different problem.
I chose the French keyboard, as it has the accents I need. I don't mind to have a less optimal character layout for English, the frequency of letters isn't so different it makes a huge difference... Of course, I have the two dictionaries (for autocompletion) and I appreciate the ease of switching them and the different color coding.

The keyboard has been designed by [Edideas](https://www.exideas.com/ME/index.php).

## The good parts

When I discovered MessagEase, I thought: "Ah! That's the one I was looking for!"...
It is an ideal keyboard both for typing text and for programmers.

With traditional keyboards, I despised to have to hit three keys to enter a capital, a number or a punctuation sign. And editing capabilities were non-existent, beside trying to tap the caret between two letters.

Despite the initial learning curve, I love to be able to move the caret, delete the char or word on right, delete the previous word, paste quickly...

And most characters used in programming are just a sweep away: {} $ [] &| etc. Even the tab character is readily available!
Idem for accented letters, always just a sweep away.

The app is free, without ads. They ask for support, which is well deserved. They also give a free game with various goals, allowing to train, measuring speed, errors and progresses. After some training, I reached a decent speed (much higher than with default keyboard). After some months of using this keyboard (typing articles such as this one in public transports on my tiny old phone), I tried the game again. And I found out I outperformed all my previous results by a large margin! Practice make it perfect. Note that pure speed is really a goal in itself (except for the challenge, of course): I don't type very fast (still reaching the top level of the games), but I don't care as I frequently stop to think what I will type next... The real goal is to let the fingers to find the letter gestures by themselves, to avoid hunt-and-type each letter. Ideally, one should be able to type without even seeing the letters on the keyboard. MessagEase has even a "blind" mode, with a grid without letters...

Note: I typed most of the articles of this site on my small phone (a Samsung Galaxy Ace 2) with this keyboard. I doubt I would have managed to do this with a classical keyboard!

## The parts needing improvements

Aka. nitpicking... Aka. personal message / remarks to the MessagEase team!

- There are two shortcuts on the drag up movement on the hand: resize the keyboard and toggle the autocompletion area (word prediction). This is confusing! Actually, the behavior depends if the area is displayed or not. This is not really well explained in the otherwise detailed documentation.
- If I type a word with a punctuation sign on the right (eg. adding some words at the end of a sentence), auto-completion is off. Word prediction should ignore characters (in general) after the caret.
- Should auto-capitalize after an ellipsis (three dots) or dot following a parenthesis, etc.
Also if there are only spaces, signs (dashes, dots, stars, parentheses, etc.) and number after the start of the line: these probably mark list items.
- I appreciate that autocompletion adds a space after the word, but is smart enough to put a punctuation sign typed immediately after against the word. But there are some caveats:
  * It doesn't work with the closing parenthesis.
  * It doesn't work with ellipsis. ..
  * In French, we put a space between a word and a double punctuation sign: colon, semi-colon, double quote (the French variants: «»), interrogation and exclamation point. It would be nice to change the behavior if we use the French dictionary (see above why keyboard detection wouldn't work).
  (Note: I found the setting to handle the closing parenthesis case; still would be nice to make this a default, and to make this setting (list of characters) depending on dictionary.)
- When I navigate deeply in the (excellent) help, I would like to have a quick way to go back to the text I edit, instead of having to hit Back several times. Perhaps change the behavior of the top-right icon, which isn't much useful currently.
- The MessagEase game should allow using any keyboard: that would allow to compare old speed with new one. Of course, results with other keyboards should be kept separate of MessagEase's results.
- Word prediction / autocompletion: as said, it is quite good. I still have two suggestions, if these gestures are possible there: a drag up would complete the chosen word with the plural form (ideally the correct one for the current language, otherwise the default regular one for this language); a drag down would complete the word without space after it, allowing to complete it faster than browsing through a long list of words with this prefix. Eg. I type _sugg_, I choose autocompletion without space to _suggest_, I type a _i_ to get the final _suggesting_ proposal which otherwise would need lot of sweeping to reach.

### Typos in Help

Seen:
indecated
commends
more then two keys
