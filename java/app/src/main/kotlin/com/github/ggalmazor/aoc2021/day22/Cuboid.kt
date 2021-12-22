package com.github.ggalmazor.aoc2021.day22

data class Cuboid(val xx: IntRange, val yy: IntRange, val zz: IntRange) {
    fun within(other: Cuboid): Boolean = other.xx.contains(xx.first) && other.xx.contains(xx.last)
            && other.yy.contains(yy.first) && other.yy.contains(yy.last)
            && other.zz.contains(zz.first) && other.zz.contains(zz.last)

    private fun overlaps(other: Cuboid): Boolean {
        return (other.xx.contains(xx.first) || xx.contains(other.xx.first))
                && (other.yy.contains(yy.first) || yy.contains(other.yy.first))
                && (other.zz.contains(zz.first) || zz.contains(other.zz.first))
    }

    fun subtract(other: Cuboid): List<Cuboid> {
        if (!overlaps(other))
            return listOf(this)

        val subtraction = mutableListOf<Cuboid>()

        if (xx.first < other.xx.first)
            subtraction.add(Cuboid(xx.first until other.xx.first, yy, zz))
        if (other.xx.last < xx.last)
            subtraction.add(Cuboid(other.xx.last + 1..xx.last, yy, zz))

        val xxRest = IntRange(
            if (xx.first < other.xx.first) other.xx.first else xx.first,
            if (other.xx.last < xx.last) other.xx.last else xx.last
        )

        if (yy.first < other.yy.first)
            subtraction.add(Cuboid(xxRest, yy.first until other.yy.first, zz))
        if (other.yy.last < yy.last)
            subtraction.add(Cuboid(xxRest, other.yy.last + 1..yy.last, zz))

        val yyRest = IntRange(
            if (yy.first < other.yy.first) other.yy.first else yy.first,
            if (other.yy.last < yy.last) other.yy.last else yy.last
        )

        if (zz.first < other.zz.first)
            subtraction.add(Cuboid(xxRest, yyRest, zz.first until other.zz.first))
        if (other.zz.last < zz.last)
            subtraction.add(Cuboid(xxRest, yyRest, other.zz.last + 1..zz.last))

        return subtraction
    }

    fun size(): Long = xx.count().toLong() * yy.count().toLong() * zz.count().toLong()
}
