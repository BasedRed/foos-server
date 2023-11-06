-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "password" TEXT NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "game" TEXT,
    "winner" TEXT,
    "winnerScore" INTEGER NOT NULL DEFAULT 8,
    "loser" TEXT,
    "loserScore" INTEGER NOT NULL,
    CONSTRAINT "Match_game_fkey" FOREIGN KEY ("game") REFERENCES "Game" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Match_winner_fkey" FOREIGN KEY ("winner") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Match_loser_fkey" FOREIGN KEY ("loser") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL DEFAULT '',
    "date" DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Match_game_idx" ON "Match"("game");

-- CreateIndex
CREATE INDEX "Match_winner_idx" ON "Match"("winner");

-- CreateIndex
CREATE INDEX "Match_loser_idx" ON "Match"("loser");
