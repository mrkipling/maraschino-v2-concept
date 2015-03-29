# Maraschino v2 concept

This is just-for-fun rewrite of the very basics of Maraschino. I wanted to play around with some new technologies and Maraschino seemed like a good fit.

This is not a replacement for Maraschino and it never will be - like I said, I'm just playing around!

## What is Maraschino?

Maraschino is an open-source web frontend for HTPCs running Kodi. You can find more details on the [project's GitHub repo](https://github.com/mrkipling/maraschino).

## Screenshots
<img src="http://www.maraschinoproject.com/static/images/concept_screen1.jpg" width="350">&nbsp;&nbsp;<img src="http://www.maraschinoproject.com/static/images/concept_screen2.jpg" width="355">

## What technologies are being used?

* React with JSX
* Flux (without a framework as I wanted to learn the key concepts)
* gulp with livereload
* LESS (using OOCSS-ish principles as I wanted to explore this approach)
* Browserify
* ECMAScript 6, transpiled to ECMAScript 5 using es6ify
* Flask (I wanted something simple so that I could focus on the front-end technologies)

## What features does it have?

Not as many as Maraschino, that's for sure! I just wanted to get a feel for the Flux architecture.

* Recent episodes
* Recent movies
* Currently playing

I might add some more over time (or not).

## How do I get started?

I purposefully haven't checked npm dependencies or compiled assets into source control. In order to run this project you will have to:

* run `npm install` to install dependencies
* run `gulp` to build the assets
* copy or rename `maraschino/settings.example.py` to `maraschino/settings.py` and fill in your Kodi server details
* run the dev server, `python maraschino.py`

## What if I just want to look at the code?

[App.jsx](https://github.com/mrkipling/maraschino-v2/blob/master/assets/js/app/App.jsx) would be a good place to start.

<img src="http://www.maraschinoproject.com/static/images/maraschino_logo.png" width="71" height="79">
