export const updateScore = (state, val) => {
    state.score.push(val)
}

export const clearScore = (state) => {
    state.score = []
}
