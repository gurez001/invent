import User from "../models/userModel";
import { generateRandomId } from "../utils/generateRandomId";

class UserRepository {
  async createUser(userData: any) {
    const { email, password, name, uuid } = userData;
    const rendom_id = generateRandomId();
    const data = {
      user_id: `user_${rendom_id}_${uuid}`,
      email,
      password,
      name,
    };
    const user = new User(data);
    return await user.save();
  }

  async findUserByEmail(email: string) {
    return await User.findOne({ email });
  }

  async findUserById(id: string) {
    return await User.findById(id);
  }

  async getAllUsers() {
    return await User.find().select("-password"); // Exclude password
  }

  async updateUser(id: string, updateData: any) {
    return await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");
  }

  async deleteUser(id: string) {
    return await User.findByIdAndDelete(id);
  }
}

export default UserRepository;
