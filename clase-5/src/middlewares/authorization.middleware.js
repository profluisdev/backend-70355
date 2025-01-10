
export const authorization = (role) => {
  return async (req, res, next) => {
      if(!req.user) return res.status(401).json({ error: "No autorizado"});
      if(req.user.role !== role) res.status(403).json({ error: "Rol inválido"});
      next();
  }
}