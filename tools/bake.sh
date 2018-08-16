#!/bin/bash
# Path to impact.js and your game's main .js
IMPACT_LIBRARY=lib/impact/impact.js
GAME=lib/game/main.js
# Output file
OUTPUT_FILE=game.min.js
# Get project dir
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && cd .. && pwd )/"
# Change CWD to Impact's base dir and bake!
cd $DIR
php tools/bake.php $IMPACT_LIBRARY $GAME $OUTPUT_FILE
