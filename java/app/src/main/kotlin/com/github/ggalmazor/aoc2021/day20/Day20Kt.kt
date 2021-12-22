package com.github.ggalmazor.aoc2021.day20

class Day20Kt(input: List<String>) {

    private val enhancer: List<Char> = input.first().toCharArray().asList()
    private val imageLines = input.subList(2, input.size).map { line -> line.toCharArray().asList() }
    private val image: Grid<Pixel> = Grid.from(imageLines, imageLines[0].size, imageLines.size, Pixel.Companion::parse)

    fun solvePart1(): Int {
        val enhancedImage = enhance(enhance(image.pad(Pixel.DARK)).pad(Pixel.DARK))
        return enhancedImage.count { cell -> cell.value == Pixel.LIGHT }
    }

    fun solvePart2(): Int {
        var enhancedImage = image
        for (i in 0 until 50) enhancedImage = enhance(enhancedImage.pad(Pixel.DARK))
        return enhancedImage.count { cell -> cell.value == Pixel.LIGHT }
    }

    fun enhance(grid: Grid<Pixel>): Grid<Pixel> {
        return grid.map { cell -> enhanceSubGrid(grid.subGridAt(cell.position, Pixel.DARK)) }
    }

    private fun enhanceSubGrid(subGrid: Grid<Pixel>): Cell<Pixel> {
        val binaryString = subGrid.asList().map {
            when (it.value) {
                Pixel.DARK -> 0
                Pixel.LIGHT -> 1
            }
        }.joinToString("")
        return Cell(subGrid.center(), Pixel.parse(enhancer[Integer.parseInt(binaryString, 2)]))
    }


}
