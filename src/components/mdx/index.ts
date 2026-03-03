import type { MDXComponents } from 'mdx/types';
import { Note, Tip, Warning } from './callout';
import { Card, CardGroup } from './card';
import { Steps, Step } from './steps';
import { CodeGroup } from './code-group';
import { ParamField } from './param-field';
import { ResponseField } from './response-field';

export const mdxComponents: MDXComponents = {
  Note,
  Tip,
  Warning,
  Card,
  CardGroup,
  Steps,
  Step,
  CodeGroup,
  ParamField,
  ResponseField,
};
