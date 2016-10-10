using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CrudAngular.Models;

namespace CrudAngular.Controllers
{
    public class PlayerController : Controller
    {
        private Context _context = null;
        public PlayerController() 
        {
            _context = new Context();
        }
        //
        // GET: /Player/

        public JsonResult GetPlayers()
        {
            List<Player> listPlayers = _context.Players.ToList();
            return Json(new { list = listPlayers},JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetPlayerById(Int32 id)
        {
            Player onePlayer = _context.Players.Where(c => c.PlayerId == id).SingleOrDefault();
            return Json(new { player = onePlayer }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult AddPlayer(Player onePlayer) 
        {
            _context.Players.Add(onePlayer);
            _context.SaveChanges();
            return Json(new { status = "Jugador Añadido Correctamente" });
        }
        public JsonResult UpdatePlayer(Player onePlayer) 
        {
            _context.Entry(onePlayer).State = System.Data.Entity.EntityState.Modified;
            _context.SaveChanges();
            return Json(new { status = "Jugador Actualizado correctamente" });
        
        }
        public JsonResult DeletePlayer(int id) 
        {
            Player onePlayer = _context.Players.Where(c => c.PlayerId == id).SingleOrDefault();
            _context.Players.Remove(onePlayer);
            _context.SaveChanges();
            return Json(new { status = "Jugador eliminado correctamente" });
        }

    }
}
