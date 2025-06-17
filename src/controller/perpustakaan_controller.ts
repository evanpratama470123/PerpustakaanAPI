import { Request, Response } from "express";
import Perpustakaan from "../models/Perpustakaan";

const PerpustakaanController = {
    index: async (req: Request, res: Response) => {
        try {
            const userId = req.query.userId
            const perpustakaans = await Perpustakaan.findAll({
                where: {
                    userId: userId
                }
            })

            return res.status(200).json({
                status: 200,
                message: "Perpustakaans sent successfully.",
                perpustakaans: perpustakaans
            })
        } catch (error: any) {
            return res.status(500).json({
                status: 500,
                message: `Error fetching perpustakaans: ${error.message}`
            })
        }
    },
    show: async (req: Request, res: Response) => {
        try {
            const perpustakaanId = req.params.id
            const perpustakaan = await Perpustakaan.findByPk(perpustakaanId)

            if (perpustakaan == null) {
                return res.status(404).json({
                    status: 404,
                    message: "Perpustakaan not found."
                })
            }

            return res.status(200).json({
                status: 200,
                message: "Perpustakaan sent successfully.",
                perpustakaan: perpustakaan
            })
        } catch (error: any) {
            return res.status(500).json({
                status: 500,
                message: `Error fetching perpustakaans: ${error.message}`
            })
        }
    },
    store: async (req: Request, res: Response) => {
        try {
            if(!req.file) {
                return res.status(400).json({
                    status: 400,
                    message: "Image file is required."
                })
            }

            const baseUrl = `${req.protocol}://${req.get("host")}`;
            const imageUrl = `${baseUrl}/public/images/${req.file.filename}`;

            const perpustakaan = await Perpustakaan.create({
                ...req.body,
                imageUrl: imageUrl,
            })

            return res.status(200).json({
                status: 200,
                message: "Perpustakaan created successfully.",
                perpustakaan: perpustakaan
            })
        } catch (error: any) {
            return res.status(500).json({
                status: 500,
                message: `Error fetching perpustakaans: ${error.message}`
            })
        }
    },
    update: async (req: Request, res: Response) => {
        try{
            const perpustakaanId = req.params.id
            const perpustakaan = await Perpustakaan.findByPk(perpustakaanId);

            if (perpustakaan == null) {
                return res.status(404).json({
                    status: 404,
                    message: "Perpustakaan not found."
                })
            }

            if (req.file) {
                const baseUrl = `${req.protocol}://${req.get("host")}`;
                const imageUrl = `${baseUrl}/public/images/${req.file.filename}`;
                req.body.imageUrl = imageUrl;
            }

            await perpustakaan.update(req.body)

            return res.status(200).json({
                status: 200,
                message: "Perpustakaan updated successfully.",
                perpustakaan: perpustakaan
            })
        } catch (error: any) {
            return res.status(500).json({
                status: 500,
                message: `Error fetching perpustakaans: ${error.message}`
            })
        }
    },
    destroy: async (req: Request, res : Response) => {
        try {
            const perpustakaanId = req.params.id
            const perpustakaan = await Perpustakaan.findByPk(perpustakaanId);

        if (perpustakaan == null) {
                return res.status(404).json({
                    status: 404,
                    message: "Perpustakaan not found."
                })
        }

        await perpustakaan.destroy();
        return res.status(200).json({
                status: 200,
                message: "Perpustakaan deleted successfully.",
                perpustakaan: perpustakaan
            })

        } catch (error: any) {
            return res.status(500).json({
                status: 500,
                message: `Error fetching perpustakaans: ${error.message}`
            })
        }
    }
}

export default PerpustakaanController;