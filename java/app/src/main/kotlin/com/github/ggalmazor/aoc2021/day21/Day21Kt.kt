package com.github.ggalmazor.aoc2021.day21

class Day21Kt {
    enum class Turn {
        PLAYER1, PLAYER2;

        fun next(): Turn {
            return when (this) {
                PLAYER1 -> PLAYER2
                PLAYER2 -> PLAYER1
            }
        }
    }

    private val rollFrequencies = mapOf(3 to 1, 4 to 3, 5 to 6, 6 to 7, 7 to 6, 8 to 3, 9 to 1)
    private val cache = mutableMapOf<GameState, WinCount>()

    fun solvePart2(): Long {
        val p1State = PlayerState(9, 0)
        val p2State = PlayerState(6, 0)
        val gameState = GameState(p1State, p2State)
        return playWithDiracDice(gameState).maxWins()
    }

    private fun playWithDiracDice(gameState: GameState): WinCount = when {
        gameState.p1Wins() -> WinCount(1, 0)
        gameState.p2Wins() -> WinCount(0, 1)
        else -> cache.getOrPut(gameState) {
            rollFrequencies.map { (roll, frequency) -> playWithDiracDice(gameState.next(roll)) * frequency }.reduce(WinCount::plus)
        }
    }

    data class GameState(val p1State: PlayerState, val p2State: PlayerState, val turn: Turn = Turn.PLAYER1, val winScore: Int = 21) {
        fun next(roll: Int): GameState = when (turn) {
            Turn.PLAYER1 -> GameState(p1State.next(roll), p2State, turn.next())
            Turn.PLAYER2 -> GameState(p1State, p2State.next(roll), turn.next())
        }

        fun p1Wins() = p1State.score >= winScore
        fun p2Wins() = p2State.score >= winScore
    }

    data class PlayerState(val position: Int, val score: Int) {
        fun next(roll: Int): PlayerState = PlayerState((position + roll) % 10, score + (position + roll) % 10 + 1)
    }

    class WinCount(private val player1Wins: Long, private val player2Wins: Long) {
        operator fun plus(other: WinCount): WinCount = WinCount(player1Wins + other.player1Wins, player2Wins + other.player2Wins)

        operator fun times(other: Int): WinCount = WinCount(player1Wins * other, player2Wins * other)

        fun maxWins(): Long = maxOf(player1Wins, player2Wins)
    }
}
