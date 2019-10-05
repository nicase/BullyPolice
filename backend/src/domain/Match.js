
class Match {
  constructor(matchData) {
    console.log(matchData);
    if (!(matchData.league
      && matchData.matchday
      && matchData.local
      && matchData.visitor
      && matchData.gLocDec
      && matchData.gVisDec
      && matchData.gLoc
      && matchData.gVis
      && matchData.percent)) {
      throw new Error('ValidationError');
    }

    this.league = matchData.league;
    this.matchday = matchData.matchday;
    this.local = matchData.local;
    this.visitor = matchData.visitor;
    this.gLocDec = matchData.gLocDec;
    this.gVisDec = matchData.gVisDec;
    this.gLoc = matchData.gLoc;
    this.gVis = matchData.gVis;
    this.percent = matchData.percent;

    if (matchData.id) {
      this.id = matchData.id;
    }

    if (matchData.createdAt) {
      this.createdAt = matchData.createdAt;
    }
    if (matchData.updatedAt) {
      this.updatedAt = matchData.updatedAt;
    }
  }

  isAdmin() {
    return this.role === 'admin';
  }
}

module.exports = Match;
