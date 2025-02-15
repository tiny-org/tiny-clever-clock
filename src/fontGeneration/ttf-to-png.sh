#!/bin/bash

set -e

DOUBLE_QUOTE='"'
BACKTICK='`'
IMAGEMAGIC_PERCENT='%%' # percent sign is a reserved character in imagemagick cli
DOLLAR='$'
CHARS="!${DOUBLE_QUOTE}#${DOLLAR}${IMAGEMAGIC_PERCENT}&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_${BACKTICK}abcdefghijklmnopqrstuvwxyz{|}~"

DIR='./src/fontGeneration/'
# FONT_NAME='FiraCode-Regular'
FONT_NAME='MartianMono-StdRg'

if [ "$(which convert)" = "convert not found" ]; then
    echo 'Missing imagemagick, please install it from e.g. https://github.com/ImageMagick/ImageMagick'
    exit 1
fi

convert \
    -background red \
    -fill black \
    -font "${DIR}${FONT_NAME}.ttf" \
    -pointsize 16 "label:${CHARS}" \
    "${DIR}${FONT_NAME}.png"

echo "transformed the following chars:"
echo "$CHARS"
