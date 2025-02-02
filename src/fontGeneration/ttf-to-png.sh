#!/bin/bash

DOUBLE_QUOTE='"'
BACKTICK='`'
IMAGEMAGIC_PERCENT='%%' # percent sign is a reserved character in imagemagick cli
DOLLAR='$'
CHARS="!${DOUBLE_QUOTE}#${DOLLAR}${IMAGEMAGIC_PERCENT}&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_${BACKTICK}abcdefghijklmnopqrstuvwxyz{|}~"

DIR='./src/fontGeneration/'
FONT_NAME='FiraCode-Regular'

if [ -z "$(magick -version)" ]; then
    echo 'Missing imagemagick, please install it from e.g. https://github.com/ImageMagick/ImageMagick'
    exit 1
fi

magick \
    -background red \
    -fill black \
    -font "${DIR}${FONT_NAME}.ttf" \
    -pointsize 16 "label:${CHARS}" \
    "${DIR}${FONT_NAME}.png"