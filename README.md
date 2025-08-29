# idilio.tv

Este es mi proyecto para el reto técnico de idilio.tv. Utilizé **React Native + Typescript, y Supabase** como backend. El proyecto consiste en crear una página tipo Netflix que muestra diferentes series. Si le das clic a la serie, puedes ver su sinopsis y lista de capítulos.

## Comenzando

El proyecto se ejecuta con el siguiente comando:
```
npx expo start
```

## Base de datos

Para explicar el SQL utilizado, primero quisiera mostrar la estructura de mi base de datos:

![estructura de la base de datos](/assets/images/diagram.png)

De aquí, escribí 2 funciones de SQL que creaban views que tenían esctructuras más fáciles de programar, haciendo que la consulta sea más eficiente:

```
CREATE OR REPLACE VIEW category_series_view AS
SELECT 
  categoria,
  JSON_AGG(DISTINCT jsonb_build_object(
    'id', id,
    'titulo', titulo,
    'sinposis', sinopsis,
    'categoria', categoria,
    'poster_url', poster_url
  )) as series_data
FROM (
  SELECT 
    id,
    titulo,
    sinopsis,
    poster_url,
    categoria
  FROM series, UNNEST(categorias) AS categoria
) 
GROUP BY categoria
```

```
CREATE OR REPLACE VIEW capitulo_series_view AS
SELECT 
  c.id AS capitulo_id,
  c.series_id,
  c.numero,
  c.nombre AS capitulo_nombre,
  s.titulo AS serie_titulo,
  s.sinopsis AS serie_sinopsis,
  s.poster_url
FROM capitulos c
LEFT JOIN series s ON c.series_id = s.id
```

## Decisiones técnicas

La primera decisión técnica que hice fue de que manera iba a agregar el CSS. Yo utilizo mucho Tailwind, pero como el proyecto es muy simple, decidí utilizar StyleSheet. Lo había usado antes, pero siento que a veces se ve un poco desordenado. Mantuve todo muy "vanilla" por la simpleza del proyecto.

La segunda decisión técnica fue que hice 2 consultas: una para series y otra para episodios. Entiendo que eso puede afectar la eficiencia cuando manejas varios datos. Pude haber utilizado mejores maneras de almacenar datos, por ejemplo, utilizar Redux. Si tuviera que construir una aplicación que necesitara escalar, habría cambiado la forma en que manejo el estado de los datos. Pero decidí mantener el programa simple.



## Prompts Usados de AI

Para AI utilizé Copilot + Deepseek. Lo utilizé para lo siguiente:
* Resolver un problema con conflictos de versiones de Node.js 
* Resolver un "warning"  
* Escribir CSS que después yo edité a mi gusto

## Si tuviera más tiempo

Si tuviera más tiempo, hay 2 cosas que me gustaría cambiar:
* **Ciberseguridad**: Pude haber implementado mejores maneras de consultar los datos, ya que no sé sobre "RLS". Si tienes el link, puedes editar la base de datos.
* **Diseño**:  Aprendí como hacer diferentes diseños para web y iOS/Android. Me hubiera gustado hacer que se vea mejor, especialmente la versión web.
* **Animación**: Netflix utiliza animaciones que hacen navegar la app una experiencia más placentera para el usuario. Me hubiera gustado agregarlas para que se vea más profesional.