package com.github.ggalmazor.aoc2021.day20

enum class Pixel {
    LIGHT, DARK;

    companion object {
        fun parse(char: Char): Pixel = when (char) {
            '.' -> DARK
            '#' -> LIGHT
            else -> throw IllegalArgumentException("Unrecognized char $char")
        }
    }
}

