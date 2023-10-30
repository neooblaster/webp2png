# webp2png

## Requirements

As the Command Line use the dependancy [`gm`](https://www.npmjs.com/package/gm) (**GraphicsMagick**), you have to follow the [installation instructions](https://www.npmjs.com/package/gm#getting-started)

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
>then either use npm:
>
>    ````plaintext
>    npm install gm
>    ````
>
>or clone the repo:
>
>    ````plaintext
>    git clone git://github.com/aheckmann/gm.git
>    ````



## Command Line

Simply open a terminal and type the following command :

````bash
webp2png '/path/to/webp/file' '/path/to/output/file'
````

The **GraphicsMagick** will automatically convert in the expected file
using extension. So the command line should be works as well for ``.jpg``
file.