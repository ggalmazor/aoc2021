package com.github.ggalmazor.aoc2021.day22

data class ReactorCubes(val onPositions: MutableSet<Position>) {
    fun merge(positions: Set<Position>) {
        onPositions.addAll(positions)
    }

    fun remove(positions: Set<Position>) {
        onPositions.removeAll(positions)
    }

    fun size(): Int = onPositions.size

    companion object {
        fun empty() = ReactorCubes(mutableSetOf())
    }
}
