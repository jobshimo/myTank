## MyTank
### Prueba técnica

- Este proyecto se inicia automaticamente al abrir index.html
- Tanque yours vs tanque rabbit en solitario: 60 pruebas realizadas. Todas inferiores a 53 segundos y con una media de 23.8 segundos.

Este es un ejemplo de texto que da entrada a una lista numerada:

1. La estrategia que he seguido ha sido evitar que el tanque colisione con las paredes de la arena y forzar su giro en ángulo hacia el centro de la arena cuando se acerca demasiado a las esquinas.
2. Seguidamente un escáner de barrido rápido que cubre los 360º y un retraso al detectar al enemigo para facilitar sucesivas localizaciones.
3. Al detectar al enemigo se disparan dos misiles por detrás y por delante del Angulo en el que se detectó al enemigo para intentar alcanzarle en movimiento. El ángulo de los dos misiles lanzados varia en función de la distancia del enemigo para facilitar golpear dos veces cuando el enemigo este lo suficientemente cerca. Los misiles explotan a la distancia de detección del enemigo + 70, para facilitar sucesivos disparos.

**Martín Miguel Bernal García**