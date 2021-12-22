package com.github.ggalmazor.aoc2021.day20

data class Cell<T>(val position: Position, val value: T) {
    fun isAt(position: Position): Boolean = this.position == position
    fun moveTo(position: Position): Cell<T> = Cell(position, value)
}

