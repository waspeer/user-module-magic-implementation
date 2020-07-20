import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';
import mjml from 'mjml';

const LAYOUT_TEMPLATE_PATH = path.resolve(__dirname, 'base/layout.mjml');

// TODO try to clean this up

export abstract class MessageCreator<T extends Record<string, any>> {
  protected abstract readonly bodyTemplatePath: string;

  private renderTemplate?: HandlebarsTemplateDelegate<T>;

  public create(parameters: T) {
    if (!this.renderTemplate) {
      const rawLayoutTemplate = fs.readFileSync(LAYOUT_TEMPLATE_PATH, 'utf-8');
      const layoutTemplate = Handlebars.compile(rawLayoutTemplate)({
        bodyTemplate: this.bodyTemplatePath,
      });
      const mjmlResult = mjml(layoutTemplate);

      if (mjmlResult.errors.length) {
        throw mjmlResult.errors[0];
      }

      this.renderTemplate = Handlebars.compile<T>(mjmlResult.html);
    }

    return this.renderTemplate(parameters);
  }
}
