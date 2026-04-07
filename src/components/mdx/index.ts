import type { MDXComponents } from 'mdx/types';
import { Note, Tip, Warning } from './callout';
import { Card, CardGroup } from './card';
import { Steps, Step } from './steps';
import { CodeGroup } from './code-group';
import { ParamField } from './param-field';
import { ResponseField } from './response-field';
import { CurrentArchDiagram } from './architecture-diagram';
import { AWSArchDiagram } from './aws-architecture-diagram';
import { AWSDetailedDiagram } from './aws-detailed-diagram';
import { EvidencePipelineDiagram } from './evidence-pipeline-diagram';
import { AuthDiagram } from './auth-diagram';
import { Mermaid } from './mermaid';

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
  CurrentArchDiagram,
  AWSArchDiagram,
  AWSDetailedDiagram,
  EvidencePipelineDiagram,
  AuthDiagram,
  Mermaid,
};
