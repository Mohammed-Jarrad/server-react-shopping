
import express, { Router } from "express";
import OrderService from "../services/orderService";

class OrderController {

    constructor() {
        this.orderService = new OrderService();
        this.intiliazeRouter();
    }

    router = Router();

    intiliazeRouter() {
        // this.router.use(auth);
        this.router.get("/orders", this.getOrders.bind(this));
        this.router.get("/orders/user", this.getOrdersForUser.bind(this));
        this.router.post("/order", this.createOrder.bind(this));
        this.router.delete("/order/:id", this.deleteOrder.bind(this));
        this.router.put("/order/:id", this.updateOrder.bind(this));
    }

    async getOrders(req = express.request, res = express.response) {
        try {
            const result = await this.orderService.getOrders();
            res.status(200).json(result);
        } catch (e) {
            const err = `faild to get all Orders, err: ${e.message}`;
            res.status(400).json({ message: err });
        }
    }

    async findOrder(req = express.request, res = express.response) {
        try {
            const result = await this.orderService.findById(req.params.id);
            res.status(200).json(result);
        } catch (e) {
            const err = `faild to get Order with id ${req.params.id}, err" ${e.message}`;
            res.status(400).json({ message: err });
        }
    }

    async getOrdersForUser(req = express.request, res = express.response) {
        try {
            const result = await this.orderService.getOrdersForUser(
                req.params.userId
            );
            res.status(200).json({ orders: result });
        } catch (e) {
            const err = `faild to get Orders for user with id ${req.params.userId}, err" ${e.message}`;
            res.status(400).json({ message: err });
        }
    }

    async createOrder(req = express.request, res = express.response) {
        try {
            const result = await this.orderService.createOrder(req.body);
            res.status(201).json(result);
        } catch (e) {
            const err = `faild to create a new Order, err" ${e.message}`;
            res.status(400).json({ message: err });
        }
    }

    async deleteOrder(req = express.request, res = express.response) {
        try {
            const result = await this.orderService.deleteOrder(req.params.id);
            result.deletedCount != 0
                ? res.status(202).end()
                : res.status(400).json("Faild to delete the Order");
        } catch (e) {
            let err = `Faild to delete Order with Id ${req.params.id}, error: ${e.message}`;
            res.status(400).json({ message: err });
        }
    }

    async updateOrder(req = express.request, res = express.response) {
        try {
            const result = await this.orderService.updateById(req.params.id, req.body);
            res.status(200).json(result);
        } catch (e) {
            const err = `faild to update Order with id ${req.params.id}, err" ${e.message}`;
            res.status(404).json({ message: err });
        }
    }
}

export default OrderController;
