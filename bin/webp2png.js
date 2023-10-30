#!/usr/bin/env node
/**
 * ----------------------------------------------------------------------------
 * webp2png.js
 *
 * @author    Nicolas DUPRE
 * @release   30.10.2023
 *
 * ----------------------------------------------------------------------------
 */



/**
 * ----------------------------------------------------------------------------
 * Management Rules :
 *
 *    1.
 *
 * ----------------------------------------------------------------------------
 */



/**
 * ----------------------------------------------------------------------------
 * TODOS:
 * ----------------------------------------------------------------------------
 */




/**
 * ----------------------------------------------------------------------------
 * Dependencies Loading & Program settings.
 * ----------------------------------------------------------------------------
 */
// Native NodeJS Dependencies :

// Dependencies :
const opt = require('ifopt');
const gm = require('gm');

// Constante
// const dbgopn = '>>>--------------[ DEBUG DUMP ]-----------------';
const dbgopn = '';
const dbgcls = '<<<---------------------------------------------';



/**
 * ----------------------------------------------------------------------------
 * Internal Program Settings
 * ----------------------------------------------------------------------------
 */
// Caractères individuels (n'accepte pas de valeur)
// Caractères suivis par un deux-points (le paramètre nécessite une valeur)
// Caractères suivis par deux-points (valeur optionnelle)
const options = {
    separator: ",",
    shortopt: "hD",
    longopt: [
        "help",
        "verbose",
        "debug",
        "no-color"
    ]
};

// Source: https://misc.flogisoft.com/bash/tip_colors_and_formatting
opt.setColor('fg.Debug', '\x1b[38;5;208m');



/**
 * ----------------------------------------------------------------------------
 * Global Variables Déclaration.
 * ----------------------------------------------------------------------------
 */
let PWD       = process.env.PWD;
let SHOWHELP  = true;
let DEBUG     = false;
let VERBOSE   = false;
let OPTS      = [];
let IMPLICITS = {WEBPFILE:null, PNGFILE: null};
let WEBPFILE  = null;
let PNGFILE   = null;
let log       = opt.log;
let clog      = console.log;



/**
 * ----------------------------------------------------------------------------
 * Functions Declaration.
 * ----------------------------------------------------------------------------
 */
/**
 * Vérifie si le fichier demandé existe.
 *
 * @param path   Emplacement du fichier à contrôller.
 * @param level  Niveau d'erreur à retourner en cas d'échec.
 *
 * @returns {boolean}
 */
function fileExists(path, level = 1) {
    try {
        fs.accessSync(path, fs.constants.F_OK | fs.constants.W_OK, (err) => {
            if (err) {
                throw err;
            }
        });

        return true;
    } catch(err) {
        log(err.toString(), level);
        process.exit();
    }
}

/**
 * Get the file content of the provided file path.
 *
 * @param {String}   file Path to the file we want to get the content.
 *
 * @return {String}  File content
 */
function getFileContent (file) {
    return fs.readFileSync(file, 'utf-8');
}

/**
 * Affiche le manuel d'aide.
 *
 * @param {Number} level  If we display the help next to an invalid command.
 *
 * @return void
 */
function help(level = 0) {
    let name = 'webp2png';
    let helpText = `
Usage : ${name} [OPTIONS]
------------------------------------------------------------

{{${name}}} convert the .webp image file to .png.

{{-h}}, {{--help}}        Display this text.
    {{--verbose}}     Verbose Mode.
    {{--debug}}       Debug Mode.
    {{--no-color}}    Remove color in the console. Usefull to
                  redirect log in a debug file.

Details :
  
    `;

    helpText = helpText.replace(
        /{{(.*?)}}/g,
        `${opt.colors.fg.Yellow}$1${opt.colors.Reset}`
    );

    console.log(helpText);
    if (level) process.exit();
}

/**
 * Vérifie si l'on peu effectuer une opération de chiffrage ou déchiffrage.
 *
 * @return boolean.
 */
function canRun() {
    // Do not run if help is requested
    return !opt.isOption(['h', 'help']);
}


/**
 * Display all the data structure.
 *
 * @param object
 */
function cdir(object) {
    console.dir(object, {depth: null});
}

/**
 * The all values of the povided structure to a empty value.
 *
 * @param {Object} object   JavaScript object structure to nullify.
 *
 * @return {*}
 */
function removeColor(object) {
    for (let pty in object) {
        if (object.hasOwnProperty(pty)) {
            if (typeof object[pty] === 'string') {
                object[pty] = '';
            }
            if (object[pty] instanceof Object) {
                object[pty] = removeColor(object[pty]);
            }
        }
    }

    return object;
}


/**
 * ----------------------------------------------------------------------------
 * Lecture des arguments du script.
 * ----------------------------------------------------------------------------
 */
OPTS = opt.getopt(
    options.shortopt,
    options.longopt,
    ['WEBPFILE', 'PNGFILE'],
    IMPLICITS
);
opt.setLogLevel('VERBOSE', false, [3]);
opt.setLogLevel('DEBUG', false, [4]);

/**
 * Traitement des options
 */
// IFILE = OPTS.in ? OPTS.in.val : OPTS.i ? OPTS.i.val : IMPLICITS.IFILE;
WEBPFILE = IMPLICITS.WEBPFILE;
PNGFILE  = IMPLICITS.PNGFILE;





/**
 * ----------------------------------------------------------------------------
 * Initializations
 * ----------------------------------------------------------------------------
 */



/**
 * ----------------------------------------------------------------------------
 * Traitement des options
 * ----------------------------------------------------------------------------
 */
// Flag for Verbose mode (Log info message)
if (opt.isOption(["verbose"])) {
    VERBOSE = true;
    opt.setLogLevel('VERBOSE', true);
}

// Flag for Debug Mode (Advance debug detail for dev)
if (opt.isOption(["D", "debug"])) {
    DEBUG = true;
    opt.setLogLevel('DEBUG', true);
}

if (opt['no-color']) {
    let colors = opt.getColors();
    colors = removeColor(colors);
    opt.setColors(colors);
}


/**
 * ----------------------------------------------------------------------------
 * Traitement en fonction des options
 * ----------------------------------------------------------------------------
 */
// Display arguments & Language settings
if (DEBUG) {
    log('Command Line Options :', 4);
    clog(dbgopn); clog(OPTS); clog(dbgcls);
    log('Implicit 1 (%s): %s', 4, ['WEBPFILE', WEBPFILE]);
    log('Implicit 1 (%s): %s', 4, ['PNGFILE', PNGFILE]);

}


// Afficher l'aide si demandée
if (OPTS.h || OPTS.help) {
    help();
    // Do not display again the help.
    SHOWHELP = false;
}



// Effectuer le traitement
if (canRun()) {
    gm(WEBPFILE).write(
        PNGFILE,
        function (err) {
         if (!err) console.log('done');
    });

    // Now issue with cli options, so do not display cli help.
    //----------------------------------------------------------------------
    SHOWHELP = false;
}



// Afficher l'aide si pas de traitement
if (SHOWHELP) {
    help();
}
