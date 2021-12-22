package com.github.ggalmazor.aoc2021.day22

data class SmartReactorCubes(var cuboids: MutableList<Cuboid>) {
    fun union(cuboid: Cuboid) {
        cuboids += cuboids.fold(mutableListOf(cuboid)) { newCuboids, existingCuboid ->
            newCuboids.flatMap { it.subtract(existingCuboid) }.toMutableList()
        }
    }

    fun subtract(cuboid: Cuboid) {
        cuboids = cuboids.flatMap { it.subtract(cuboid) }.toMutableList()
    }

    fun size(): Long = cuboids.sumOf { it.size() }

    companion object {
        fun empty() = SmartReactorCubes(mutableListOf())
    }
}
