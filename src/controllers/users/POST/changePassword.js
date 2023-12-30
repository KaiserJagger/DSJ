// userController.js

import UserModel from "../../../dao/models/user.model.js";
import bcrypt from 'bcrypt';
import logger from "../../../utils/logger.js";

export const changePassword = async (req, res) => {
  const { userId, currentPassword, newPassword, confirmNewPassword } = req.body;

  try {
    // Verificar si las contraseñas nuevas coinciden
    if (newPassword !== confirmNewPassword) {
      return res.status(400).send({ error: 'Las contraseñas nuevas no coinciden' });
    }

    // Obtener el usuario por ID
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }

    // Verificar la contraseña actual
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordValid) {
      return res.status(401).send({ error: 'Contraseña actual incorrecta' });
    }

    // Generar el hash para la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar la contraseña del usuario
    user.password = hashedPassword;
    await user.save();

    logger.info(`Contraseña cambiada exitosamente - (${user.email})`);
    return res.status(200).send({ message: 'Contraseña actualizada exitosamente' });

  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error al cambiar la contraseña' });
  }
};
