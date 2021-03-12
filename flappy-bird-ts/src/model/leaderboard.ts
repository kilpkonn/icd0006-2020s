
interface Score {
    name: string;
    score: number
}

class Leaderboard {
    scores: Score[] = []
}

export default Leaderboard;
