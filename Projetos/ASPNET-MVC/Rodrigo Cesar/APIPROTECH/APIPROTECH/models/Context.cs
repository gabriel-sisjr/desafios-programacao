
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIPROTECH.Models
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options): base(options)
        {

        }
        public DbSet<Pessoa> Pessoa {get; set;}
        public DbSet<Formacao> Formacao{ get; set; }
        public DbSet<Experiencia> Experiencia { get; set; }
        public DbSet<ExperienciaEmpresa> ExperienciaEmpresa { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Pessoa>().HasKey(t => t.Codigo);
            modelBuilder.Entity<Pessoa>().HasMany(t => t.Formacao).WithOne(t => t.Pessoa);
            modelBuilder.Entity<Pessoa>().HasMany(t => t.Experiencia).WithOne(t => t.Pessoa);
            modelBuilder.Entity<Pessoa>().HasMany(t => t.ExperienciaEmpresas).WithOne(t => t.Pessoa);
            
            modelBuilder.Entity<Formacao>().HasKey(t => t.Codigo);
            modelBuilder.Entity<Formacao>().HasOne(t => t.Pessoa);
            
            modelBuilder.Entity<Experiencia>().HasKey(t => t.Codigo);
            modelBuilder.Entity<Experiencia>().HasOne(t => t.Pessoa);
            
            modelBuilder.Entity<ExperienciaEmpresa>().HasKey(t => t.Codigo);
            modelBuilder.Entity<ExperienciaEmpresa>().HasOne(t => t.Pessoa);


        }
        
    }
}
