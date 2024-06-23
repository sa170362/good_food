import express, { Request, Response } from 'express';
import Porudzbina from '../models/narudzbina';

export class NarudzbinaController {
  // GET /narudzbine - Dobavlja sve narudžbine
  getOrders = async (req: Request, res: Response) => {
    const { restoran } = req.params;
    try {
      const orders = await Porudzbina.find({status: "pending", restoran:restoran });
      res.json(orders);
    } catch (err) {
      res.status(500).send(err);
    }
  };
  getConfirmedOrders = async (req: Request, res: Response) => {
    const { restoran } = req.params;
    try {
      const orders = await Porudzbina.find({status: "confirmed", restoran:restoran});
      res.json(orders);
    } catch (err) {
      res.status(500).send(err);
    }
  };
  getRejectedOrders = async (req: Request, res: Response) => {
    const { restoran } = req.params;
    try {
      const orders = await Porudzbina.find({status: "rejected", restoran:restoran});
      res.json(orders);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  // PUT /narudzbine/confirm/:customer - Potvrđuje narudžbinu za određenog korisnika
  confirmOrder = async (req: Request, res: Response) => {
    const { customerkorIme } = req.params;
    const { estimatedDeliveryTime } = req.body;
  
    try {
      const orders = await Porudzbina.find({ customerkorIme});
  
      if (orders.length === 0) {
        return res.status(404).send('Orders not found for the given customer');
      }
  
      for (let order of orders) {
        order.status = 'confirmed';
        order.estimatedDeliveryTime = estimatedDeliveryTime;
        await order.save();
      }
  
      res.json(orders);
    } catch (err) {
      res.status(500).send(err);
    }
  };
  

  // PUT /narudzbine/reject/:customer - Odbija narudžbinu za određenog korisnika
  rejectOrder = async (req: Request, res: Response) => {
    const { customerkorIme } = req.params;
  
    try {
      const orders = await Porudzbina.find({ customerkorIme });
  
      if (orders.length === 0) {
        return res.status(404).send('Orders not found for the given customer');
      }
  
      for (let order of orders) {
        order.status = 'rejected';
        await order.save();
      }
  
      res.json(orders);
    } catch (err) {
      res.status(500).send(err);
    }
  };
  
}
