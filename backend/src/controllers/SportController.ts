import { Request, Response } from "express";
import Sport from "../models/Sport";

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};

export const createSport = async (req: Request, res: Response) => {
  try {
    const { name, description, country, players } = req.body;
    const sport = await Sport.create({
      name,
      description,
      country,
      players,
      });
    return res.status(201).json(sport);
      } catch (error) {
        return res.status(500).json({ error: getErrorMessage(error) });
        }
}

export const getAllSports = async (req: Request, res: Response) => {
  try {
    const sports = await Sport.findAll();
    return res.status(200).json(sports);
  } catch (error) {
    return res.status(500).json({ error: getErrorMessage(error) });
  }
}

export const findSportByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const sport = await Sport.findOne({ where: { name } });
    if (!sport) {
      return res.status(404).json({ error: 'Sport not found' });
      }
    console.log(sport);
    return res.status(200).json(sport);
  } catch (error) {
    console.error('Error finding sport:', error);
    return res.status(500).json({ error: 'Failed to find sport' });
  }
};

export const updateSport = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, country, players } = req.body;

    console.log('Received data for update:', { id, name, description, country, players });

    if (typeof players !== 'number' || isNaN(players)) {
      return res.status(400).json({ error: 'Invalid number of players' });
    }

    const sport = await Sport.findByPk(id);

    if (sport) {
      sport.name = name;
      sport.description = description;
      sport.country = country;
      sport.players = players;

      console.log('Updating sport:', sport);

      await sport.save();

      return res.status(200).json(sport);
    }

    return res.status(404).json({ error: 'Sport not found' });
  } catch (error) {
    console.error('Error updating sport:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};



export const deleteSport = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const sport = await Sport.findOne({ where: { name } });
    if (sport) {
      await sport.destroy();
      return res.status(200).json({ message: "Sport deleted" });
    }
    return res.status(404).json({ error: "Sport not found" });
  } catch (error) {
    return res.status(500).json({ error: getErrorMessage(error) });
  }
}