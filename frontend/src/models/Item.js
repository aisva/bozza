export default class Item {
  constructor(
    itemId,
    userId,
    text,
    createdAt,
    updatedAt,
    dueDate = null,
    downloadUrl = null
  ) {
    this.itemId = itemId;
    this.userId = userId;
    this.text = text;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.dueDate = dueDate;
    this.downloadUrl = downloadUrl;
  }
}
