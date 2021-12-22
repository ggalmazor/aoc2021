package com.github.ggalmazor.aoc2021

import com.github.ggalmazor.aoc2021.day20.Day20Kt
import com.github.ggalmazor.aoc2021.day21.Day21Kt
import com.github.ggalmazor.aoc2021.day22.Day22Kt
import java.io.File

fun readInput(day: Int) = File("/Users/guillermo/src/yo/aoc2021/java/app/src/main/resources/input/day$day").readLines()

fun main(args: Array<String>) {
    println("Day 20 - Part 1: ${Day20Kt(readInput(20)).solvePart1()}")
    println("Day 20 - Part 2: ${Day20Kt(readInput(20)).solvePart2()}")
    println("Day 21 - Part 2: ${Day21Kt().solvePart2()}")
    println("Day 22 - Part 1: ${Day22Kt(readInput(22)).solvePart1()}")
    println("Day 22 - Part 2: ${Day22Kt(readInput(22)).solvePart2()}")
}
