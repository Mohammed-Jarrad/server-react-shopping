// import UserService from '@services/userService';
// import Logger from '@utils/logger';
// import express, { Router } from 'express';
// import jwt from '@utils/jwt';
// import auth from '@middlewares/auth';

// class UserController {
//     constructor(userService: UserService = new UserService()) {
//         this.intiliazeRouter();
//     }
//     router = Router();

//     intiliazeRouter() {
//         this.router.post('/user/login', this.login.bind(this));
//         this.router.use(auth);
//         this.router.get('/users', this.getUsers.bind(this));
//         this.router.get('/user', this.findUser.bind(this));
//         this.router.get('/user/contacts', this.getCareGiverContacts.bind(this));
//         this.router.post('/user', this.createUser.bind(this));
//         this.router.delete('/user', this.deleteUser.bind(this));
//         this.router.put('/user', this.updateUser.bind(this));
//     }

//     async getUsers(req, res) {
//         try {
//             const result = await this.userService.findAll();
//             res.status(200).json(result);
//         } catch (e) {
//             const err = faild to get all users, err: ${e.message};
//             Logger.ERROR(err);
//             res.status(400).json({ message: err });
//         }
//     }

//     async getCareGiverContacts(req, res) {
//         try {
//             const result = await this.userService.getCareGiverContacts(req.params.userId);
//             res.status(200).json({ contacts: result ? result : [] });
//         } catch (e) {
//             const err = faild to get all users, err: ${e.message};
//             Logger.ERROR(err);
//             res.status(400).json({ message: err });
//         }
//     }

//     async findUser(req, res) {
//         try {
//             const result = await this.userService.findById(req.params.userId);
//             res.status(200).json(result);
//         } catch (e) {
//             const err = faild to get user with id ${req.params.userId}, err" ${e.message};
//             Logger.ERROR(err);
//             res.status(400).json({ message: err });
//         }
//     }

//     async createUser(req, res) {
//         try {
//             const result = await this.userService.save(req.body);
//             res.status(201).json(result);
//         } catch (e) {
//             const err = faild to create a new user, err" ${e.message};
//             Logger.ERROR(err);
//             res.status(404).json({ message: err });
//         }
//     }

//     async deleteUser(req, res) {
//         try {
//             const result = await this.userService.delete(req.params.userId);
//             result.deletedCount != 0
//                 ? res.status(202).end()
//                 : res.status(400).json('Faild to delete the user');
//         } catch (e) {
//             let err = Faild to delete Call with Id ${req.params.userId}, error: ${e.message};
//             Logger.ERROR(err);
//             res.status(400).json({ message: err });
//         }
//     }

//     async updateUser(req, res) {
//         try {
//             const result = await this.userService.update(req.params.userId, req.body);
//             res.status(200).json(result);
//         } catch (e) {
//             const err = faild to update user with id ${req.params.userId}, err" ${e.message};
//             Logger.ERROR(err);
//             res.status(404).json({ message: err });
//         }
//     }
//     async login(req, res) {
//         const { username } = req.body || null;
//         if (!username) {
//             return res.status(400).json({ msg: 'username is requierd in the body' });
//         }
//         try {
//             const user = await this.userService.findUserByUserName(username);
//             if (!user) {
//                 const msg = the user with user name ${username} does not found;
//                 Logger.ERROR(msg);
//                 return res.status(404).json({ msg });
//             }
//             const token = jwt.createToken({ _id: user!._id });
//             res.status(200).json({
//                 token,
//             });
//         } catch (e) {
//             const err = faild to login for user: ${username}, err" ${e.message};
//             Logger.ERROR(err);
//             res.status(404).json({ message: err });
//         }
//     }
// }

// export default UserController;