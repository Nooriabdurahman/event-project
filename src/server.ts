import swaggerUi from 'swagger-ui-express';
import app from './app';
import swaggerSpec from './common/utils/swagger';

const port = Number(process.env.PORT) || 8000;

// Swagger setup
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use((_req, res) => {
  res.status(404).json({ error: 'Route does not exist' });
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});