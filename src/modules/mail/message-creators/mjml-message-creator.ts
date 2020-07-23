import path from 'path';
import Handlebars from 'handlebars';
import mjml from 'mjml';
import type { MessageCreator } from '../types/message-creator';
import { createFactoryFromFile } from './helpers/create-factory-from-file';

interface LayoutParameters {
  bodyTemplate: string;
}

interface Props {
  createMJMLTemplate?: (parameters: LayoutParameters) => string;
  mjmlBodyTemplate: string;
  subjectTemplate: string;
}

const LAYOUT_TEMPLATE_PATH = path.resolve(__dirname, 'layout.mjml');
const DEFAULT_MJML_TEMPLATE_FACTORY = createFactoryFromFile(LAYOUT_TEMPLATE_PATH);

export class MJMLMessageCreator<T extends Record<string, any>> implements MessageCreator<T> {
  private createHTML: (parameters: T) => string;
  private createSubject: (parameters: T) => string;

  public constructor({
    mjmlBodyTemplate,
    subjectTemplate,
    createMJMLTemplate = DEFAULT_MJML_TEMPLATE_FACTORY,
  }: Props) {
    // The body template needs to be insterted into the layout template
    const MJMLTemplate = createMJMLTemplate({ bodyTemplate: mjmlBodyTemplate });
    const createMJML = Handlebars.compile<T>(MJMLTemplate);

    this.createHTML = (parameters: T) => mjml(createMJML(parameters)).html;
    this.createSubject = Handlebars.compile<T>(subjectTemplate);
  }

  public create(parameters: T) {
    return {
      subject: this.createSubject(parameters),
      html: this.createHTML(parameters),
    };
  }

  static create(options: { mjmlBodyTemplate: string; subjectTemplate: string }) {
    return new MJMLMessageCreator(options);
  }
}
