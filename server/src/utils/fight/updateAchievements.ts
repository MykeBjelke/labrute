/* eslint-disable no-await-in-loop */
import { AchievementsStore } from '@labrute/core';
import { AchievementName, PrismaClient } from '@labrute/prisma';

const updateAchievements = async (
  prisma: PrismaClient,
  store: AchievementsStore,
  isTournamentFight: boolean,
) => {
  for (const [_bruteId, bruteStore] of Object.entries(store)) {
    const bruteId = +_bruteId;
    for (const [_name, count] of Object.entries(bruteStore.achievements)) {
      const name = _name as AchievementName;

      // Tournament fight, delay
      if (isTournamentFight) {
        // Get existing delayed achievement
        const existingAchievement = await prisma.tournamentEarning.findFirst({
          where: {
            achievement: name,
            bruteId,
          },
        });

        if (existingAchievement) {
          // Update existing delayed achievement
          await prisma.tournamentEarning.update({
            where: {
              id: existingAchievement.id,
            },
            data: {
              achievementCount: {
                increment: count,
              },
            },
          });
        } else {
          // Create new delayed achievement
          await prisma.tournamentEarning.create({
            data: {
              achievement: name,
              achievementCount: count,
              bruteId,
              date: new Date(),
            },
          });
        }
      } else {
        // Normal fight, update immediately

        // Get existing achievement
        const existingAchievement = await prisma.achievement.findFirst({
          where: {
            name,
            bruteId,
          },
        });

        if (existingAchievement) {
          // Update existing achievement
          await prisma.achievement.update({
            where: {
              id: existingAchievement.id,
            },
            data: {
              count: {
                increment: count,
              },
            },
          });
        } else {
          // Create new achievement
          await prisma.achievement.create({
            data: {
              name,
              count,
              userId: bruteStore.userId,
              bruteId,
            },
          });
        }
      }
    }
  }
};

export default updateAchievements;