package com.github.ggalmazor.aoc2021.day22

class Day22Kt(val lines: List<String>) {

    fun solvePart1(): Long {
        val stage = Cuboid((-50..50), (-50..50), (-50..50))

        //        val reactorCubes = ReactorCubes.empty()
        //        operations.filter { (cuboid, _) -> cuboid.within(stage) }.forEach { (cuboid, status) ->
        //            when (status) {
        //                Status.ON -> reactorCubes.merge(cuboid.positions())
        //                Status.OFF -> reactorCubes.remove(cuboid.positions())
        //            }
        //        }
        //        return reactorCubes.size()
        val reactorCubes = SmartReactorCubes.empty()
        parseOperations().filter { (cuboid, _) -> cuboid.within(stage) }.forEach { (cuboid, status) ->
            when (status) {
                Status.ON -> reactorCubes.union(cuboid)
                Status.OFF -> reactorCubes.subtract(cuboid)
            }
        }
        return reactorCubes.size()
    }

    fun solvePart2(): Long {
        val reactorCubes = SmartReactorCubes.empty()
        parseOperations().forEach { (cuboid, status) ->
            when (status) {
                Status.ON -> reactorCubes.union(cuboid)
                Status.OFF -> reactorCubes.subtract(cuboid)
            }
        }
        return reactorCubes.size()
    }

    private fun parseOperations(): List<Operation> {
        val operations = lines.map { line ->
            val status = if (line.startsWith("on")) Status.ON else Status.OFF
            val rest = if (line.startsWith("on")) line.substring(3) else line.substring(4)
            val (xRange, yRange, zRange) = rest.split(",").toList().map { s ->
                val (start, endInclusive) = s.substring(2).split("..").map(Integer::parseInt)
                (start..endInclusive)
            }
            Operation(Cuboid(xRange, yRange, zRange), status)
        }
        return operations
    }

}
