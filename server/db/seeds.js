use bucketlists;
db.dropDatabase();

db.bucketlists.insertMany([
  {
    item: "Fly Helicopter",
    description: "Get a helicopter flying lesson or two",
    priotity: "Urgent"
  },
  {
    item: "Mow Lawn",
    description: "Mow lawn in Iceland at midnight(not the shop)",
    priotity: "Soon"
  },
  {
    item: "Terraform Planet",
    description: "Terraform any planet before earth is goosed",
    priotity: "Urgent"
  },
  {
    item: "Own a Tesla",
    description: "Delivered by Elon himself",
    priotity: "Urgent"
  },
  {
    item: "Swim with dolphins",
    description: "Not at a Seaworld",
    priotity: "Non-Urgent"
  },
  {
    item: "Enter Zero Gravity",
    description: "Whatever it takes",
    priotity: "Soon"
  },
  {
    item: "Eat the rich",
    description: "Before it is too late",
    priotity: "Urgent"
  }
]);
