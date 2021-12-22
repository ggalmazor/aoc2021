package com.github.ggalmazor.aoc2021.day20

class Grid<T>(private val cells: List<Cell<T>>, private val width: Int, private val height: Int) {
    fun cellAt(position: Position): Cell<T>? {
        return cells.find { cell -> cell.isAt(position) }
    }

    fun subGridAt(position: Position, defaultValue: T): Grid<T> = Grid(
        listOf(
            cellAt(position.topLeft()) ?: Cell(position.topLeft(), defaultValue),
            cellAt(position.top()) ?: Cell(position.top(), defaultValue),
            cellAt(position.topRight()) ?: Cell(position.topRight(), defaultValue),
            cellAt(position.left()) ?: Cell(position.left(), defaultValue),
            cellAt(position.center()) ?: Cell(position.center(), defaultValue),
            cellAt(position.right()) ?: Cell(position.right(), defaultValue),
            cellAt(position.bottomLeft()) ?: Cell(position.bottomLeft(), defaultValue),
            cellAt(position.bottom()) ?: Cell(position.bottom(), defaultValue),
            cellAt(position.bottomRight()) ?: Cell(position.bottomRight(), defaultValue),
        ), 3, 3
    )

    fun asList(): List<Cell<T>> = cells

    fun center(): Position = cells[Math.floorDiv(cells.size, 2)].position

    fun pad(value: T): Grid<T> {
        val movedCells = cells.map { cell -> cell.moveTo(cell.position.bottomRight()) }
        val newCellsOnTheTop = (0..width + 1).map { x -> Cell(Position(x, 0), value) }
        val newCellsOnTheBottom = (0..width + 1).map { x -> Cell(Position(x, height + 1), value) }
        val newCellsOnTheRight = (1..height).map { y -> Cell(Position(width + 1, y), value) }
        val newCellsOnTheLeft = (1..height).map { y -> Cell(Position(0, y), value) }
        return Grid(movedCells + newCellsOnTheTop + newCellsOnTheRight + newCellsOnTheBottom + newCellsOnTheLeft, width + 2, height + 2)
    }

    fun map(mapper: (Cell<T>) -> Cell<T>): Grid<T> {
        return Grid(cells.parallelStream().map(mapper).toList(), width, height)
    }

    fun count(predicate: (Cell<T>) -> Boolean): Int {
        return cells.count(predicate)
    }

    companion object {
        fun <U> from(lines: List<List<Char>>, width: Int, height: Int, mapper: (Char) -> U): Grid<U> = Grid(
            lines.flatMapIndexed { y, chars -> chars.mapIndexed { x, char -> Cell(Position(x, y), mapper(char)) } },
            width,
            height
        )
    }
}

