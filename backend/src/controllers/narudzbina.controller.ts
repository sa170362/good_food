import express, { Request, Response } from 'express';
import Porudzbina from '../models/narudzbina';
import cartItem from '../models/cartItem';

export class NarudzbinaController {
  // GET /narudzbine - Dobavlja sve narudžbine
  getOrders = async (req: Request, res: Response) => {
    try {
      const orders = await Porudzbina.find();
      res.json(orders);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  // PUT /narudzbine/confirm/:customer - Potvrđuje narudžbinu za određenog korisnika
  confirmOrder = async (req: Request, res: Response) => {
    const { customer } = req.params;
    const { estimatedDeliveryTime } = req.body;
  
    try {
      const orders = await Porudzbina.find({ customer });
  
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
    const { customer } = req.params;
  
    try {
      const orders = await Porudzbina.find({ customer });
  
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

  kreirajPorudzbinu = async (req: Request, res: Response) => {
    try {
      // Kreiranje i čuvanje stavki korpe
      const stavke = await Promise.all(req.body.stavke.map(async (stavka: any) => {
        const novaStavka = new cartItem({
          jelo: stavka.jelo._id, // Ovde se koristi samo ID jela
          kolicina: stavka.kolicina
        });
        await novaStavka.save(); // Čuvanje stavke korpe u bazi
        return novaStavka; // Vraćanje sačuvane stavke
      }));
  
      // Kreiranje i čuvanje nove porudžbine
      const novaPorudzbina = new Porudzbina({
        customer: req.body.customer,
        stavke: stavke.map(stavka => stavka._id), // Mapiranje samo ID-jeva stavki
        ukupnaCena: req.body.ukupnaCena,
        adresaDostave: req.body.adresaDostave,
        kontaktTelefon: req.body.kontaktTelefon
      });

      console.log(novaPorudzbina);
      
  
      await novaPorudzbina.save(); // Čuvanje porudžbine u bazi
      res.status(201).send(novaPorudzbina); // Slanje odgovora sa statusom 201 (Created) i podacima nove porudžbine
    } catch (error) {
      console.error('Greška prilikom kreiranja porudžbine:', error);
      res.status(400).send(error); // Slanje greške ako se desi problem pri čuvanju porudžbine
    }
  };
  
  svePorudzbine = async (req: Request, res: Response) => {
  // Dohvatanje svih porudžbina
    try {
      const porudzbine = await Porudzbina.find().populate('stavke');
      res.status(200).send(porudzbine);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
}
