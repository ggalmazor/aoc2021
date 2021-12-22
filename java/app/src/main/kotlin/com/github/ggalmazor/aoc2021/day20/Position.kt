package com.github.ggalmazor.aoc2021.day20

data class Position(val x: Int, val y: Int) {
    fun topLeft(): Position = Position(x - 1, y - 1)
    fun top(): Position = Position(x, y - 1)
    fun topRight(): Position = Position(x + 1, y - 1)
    fun left(): Position = Position(x - 1, y)
    fun center(): Position = this
    fun right(): Position = Position(x + 1, y)
    fun bottomLeft(): Position = Position(x - 1, y + 1)
    fun bottom(): Position = Position(x, y + 1)
    fun bottomRight(): Position = Position(x + 1, y + 1)
}
