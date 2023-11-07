# webp2png

A very little command line to convert ``.webp`` to **any supported format**
by [GraphicsMagick](http://www.graphicsmagick.org/formats.html).

## Requirements

As the Command Line uses the dependency [`gm`](https://www.npmjs.com/package/gm) (**GraphicsMagick**), you have to follow the [installation instructions](https://www.npmjs.com/package/gm#getting-started) ([Direct Link to Download(Sourceforge)](https://sourceforge.net/projects/graphicsmagick/files/graphicsmagick-binaries/1.3.42/))

> First download and install [GraphicsMagick](http://www.graphicsmagick.org/) 
> or [ImageMagick](http://www.imagemagick.org/). 
> In Mac OS X, you can simply use [Homebrew](http://mxcl.github.io/homebrew/) and do:
>
>    ````plaintext
>    brew install imagemagick
>    brew install graphicsmagick
>    ````
>    
>
> then either use npm:
>
>    ````plaintext
>    npm install gm
>    ````
>
> or clone the repo:
>
>    ````plaintext
>    git clone git://github.com/aheckmann/gm.git
>    ````



## `webp2png` Command Line

Simply open a terminal and type the following command :

````bash
webp2png '/path/to/webp/file.webp' '/path/to/output/file.png'
````

The **GraphicsMagick** will automatically convert in the expected file
using extension. Currently, this command line has no option to customize 
``gm``

Example in terminal from the project root folder :

````bash
webp2png ../test/LOGO-UIPATH-850.webp ../test/LOGO-UIPATH-850.png
````