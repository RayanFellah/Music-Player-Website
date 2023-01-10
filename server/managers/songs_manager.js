const { FileSystemManager } = require("./file_system_manager");
const path = require("path");

class SongsManager {
  constructor () {
    this.JSON_PATH = path.join(__dirname + "../../data/songs.json");
    this.fileSystemManager = new FileSystemManager();
  }

  /**
   * Retourne la liste de toutes les chansons
   * @returns {Promise<Array>}
   */
  async getAllSongs () {
    const fileBuffer = await this.fileSystemManager.readFile(this.JSON_PATH);
    return JSON.parse(fileBuffer).songs;
  }

  /**
   * TODO : Implémenter la récupération d'une chanson en fonction de son id
   * Retourne une chanson en fonction de son id
   * @param {number} id identifiant de la chanson
   * @returns chanson correspondant à l'id
   */
  async getSongById (id) {
    const allSongs = await this.getAllSongs();
    const song = allSongs.find((item) => item.id === id);
    return song;
  }

  /**
   * TODO : Implémenter l'inversement de l'état aimé d'une chanson
   * Modifie l'état aimé d'une chanson par l'état inverse
   * @param {number} id identifiant de la chanson
   * @returns {boolean} le nouveau état aimé de la chanson
   */
  async updateSongLike (id) {
    let songs = await this.getAllSongs();
    const song = await this.getSongById(id);
    if (song === undefined) {
      return;
    }
    if (song.liked) {
      song.liked = false;
    } else {
      song.liked = true;
    }
    const newSongs = songs.filter((item) => item.id !== id);
    newSongs.push(song);
    songs = newSongs;
    await this.fileSystemManager.writeToJsonFile(this.JSON_PATH, JSON.stringify({ songs }));
    return song.liked;
  }
}

module.exports = { SongsManager };
