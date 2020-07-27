import 'cross-fetch/polyfill';
import type { Express } from 'express';
import { Router } from 'express';
import { GraphQLClient } from 'graphql-request';
import type { ServerMiddleware } from '~root/infrastructure/types/server-middleware';

/**
 * THIS IS A SHORTCUT FOR PROTOTYPING PURPOSES
 */

export class Routes implements ServerMiddleware {
  private readonly client: GraphQLClient;

  public constructor() {
    this.client = new GraphQLClient('http://localhost:4444/graphql');
  }

  // eslint-disable-next-line class-methods-use-this
  public apply(app: Express) {
    const router = Router();

    router.get('/login', async (req, res) => {
      const { token } = req.query;

      if (!token) {
        return res.status(400).json({ error: 'No token provided' });
      }

      const query = /* GraphQL */ `
        mutation($token: String!) {
          result: VerifyToken(token: $token) {
            ... on VerifyTokenPayload {
              userId
              user {
                id
                email
              }
            }

            ... on Error {
              message
            }
          }
        }
      `;

      const { result } = await this.client
        .request(query, { token })
        .catch((error) => ({ result: { message: error.message } }));

      if (result.message) {
        return res.status(400).json(result);
      }

      return res.json(result);
    });

    app.use(router);
  }
}
