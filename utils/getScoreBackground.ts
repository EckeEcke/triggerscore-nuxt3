export const getScoreBackground = (score: number | undefined) => {
    if (!score && score !== 0) return 'bg-gray-500'
    if (score >= 7) return 'bg-red-700'
    if (score < 7 && score >= 4) return 'bg-yellow-500'
    if (score < 4) return 'bg-green-600'
    return 'bg-gray-500'
}