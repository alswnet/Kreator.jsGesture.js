Kreator.jsGesture.js
====================

Slide tool interface for Reveal.js plus getUserMedia slide control

I combined webcam-based gesture recognition with Andrei Opreia "Piatra"'s Kreator.js
___________________________________
About Kreator.js

GUI Editor for reveal.js https://github.com/hakimel/reveal.js/issues/31

There is now an online version of this http://piatra.jit.su (may include work in progress)

There is an about page https://github.com/piatra/kreator.js/wiki/About

Features

Create slides
Create slides either horizontally or vertically
Working with text
h1/h2/...
Custom text rotation
Choosing font size
Left/Center/Right Alignment
Bold/Italic/Links
Choose different themes
Night
Beige
Custom CSS background gradients
Neon
Google Webfonts
An inline menu is available, pasting in the name of a google webfont will trigger that font
Downloading the slides in a .zip archive
Contains all the reveal.js dependecies
Your custom CSS file if you added any extra style
!Known bug, unziping on OSX only works in the console :( https://github.com/janjongboom/node-native-zip/issues/9
Feature requests

Please submit features bugs and request I'm very interested in what people expect from such an editor. You can add them as feature in the issue tracker

Feature list (coming)

Upload existing presentation
Using File API to save intermediate snapshots
Submit your own!
Copyright and license

Licensed under the Apache License, Version 2.0

________________________________________________________________________

About Gesture.js

This is what I got when I combined webcam-based gesture recognition with Hakim El Hattab's reveal.js. It took me a while to write and fine tune the detection algorithms. Even then, the algorithms are only about 80% accurate. You get the gist of it though: A flick of the hand in mid-air changes the slide. A two hand flick up or down activates the slide overview.

View the live demo! http://reveal.rs.af.cm/

License

MIT licensed

Copyright (C) 2011-2012 Hakim El Hattab, http://hakim.se


