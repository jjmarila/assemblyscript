// Abstract Syntax Tree extras that are not needed in a standalone compiler but quite useful for
// testing the parser.

import {
  Token,
  Node,
  NodeKind,
  Source,

  CommonTypeNode,
  TypeNode,
  TypeParameterNode,
  SignatureNode,

  Expression,
  IdentifierExpression,
  LiteralExpression,
  LiteralKind,
  FloatLiteralExpression,
  IntegerLiteralExpression,
  StringLiteralExpression,
  RegexpLiteralExpression,
  ArrayLiteralExpression,
  AssertionExpression,
  AssertionKind,
  BinaryExpression,
  CallExpression,
  CommaExpression,
  ElementAccessExpression,
  FunctionExpression,
  NewExpression,
  ParenthesizedExpression,
  PropertyAccessExpression,
  TernaryExpression,
  UnaryPostfixExpression,
  UnaryExpression,
  UnaryPrefixExpression,

  Statement,
  BlockStatement,
  BreakStatement,
  ContinueStatement,
  DoStatement,
  EmptyStatement,
  ExportImportStatement,
  ExportStatement,
  ExpressionStatement,
  ForStatement,
  IfStatement,
  ImportStatement,
  ReturnStatement,
  SwitchStatement,
  ThrowStatement,
  TryStatement,
  VariableStatement,
  WhileStatement,

  ClassDeclaration,
  EnumDeclaration,
  EnumValueDeclaration,
  FieldDeclaration,
  FunctionDeclaration,
  ImportDeclaration,
  InterfaceDeclaration,
  MethodDeclaration,
  NamespaceDeclaration,
  TypeDeclaration,
  VariableDeclaration,

  DecoratorNode,
  ModifierNode,
  ModifierKind,
  ParameterNode,
  ParameterKind,
  ExportMember,
  SwitchCase,

  hasModifier
} from "../ast";

import {
  CharCode
} from "../util/charcode";

export function serializeNode(node: Node, sb: string[]): void {
  switch (node.kind) {
    case NodeKind.SOURCE: {
      serializeSource(<Source>node, sb);
      break;
    }

    // types

    case NodeKind.TYPE: {
      serializeTypeNode(<TypeNode>node, sb);
      break;
    }
    case NodeKind.TYPEPARAMETER: {
      serializeTypeParameter(<TypeParameterNode>node, sb);
      break;
    }

    // expressions

    case NodeKind.FALSE:
    case NodeKind.NULL:
    case NodeKind.SUPER:
    case NodeKind.THIS:
    case NodeKind.TRUE:
    case NodeKind.CONSTRUCTOR:
    case NodeKind.IDENTIFIER: {
      serializeIdentifierExpression(<IdentifierExpression>node, sb);
      break;
    }
    case NodeKind.ASSERTION: {
      serializeAssertionExpression(<AssertionExpression>node, sb);
      break;
    }
    case NodeKind.BINARY: {
      serializeBinaryExpression(<BinaryExpression>node, sb);
      break;
    }
    case NodeKind.CALL: {
      serializeCallExpression(<CallExpression>node, sb);
      break;
    }
    case NodeKind.COMMA: {
      serializeCommaExpression(<CommaExpression>node, sb);
      break;
    }
    case NodeKind.ELEMENTACCESS: {
      serializeElementAccessExpression(<ElementAccessExpression>node, sb);
      break;
    }
    case NodeKind.FUNCTION:
    case NodeKind.FUNCTIONARROW: {
      serializeFunctionExpression(<FunctionExpression>node, sb);
      break;
    }
    case NodeKind.LITERAL: {
      serializeLiteralExpression(<LiteralExpression>node, sb);
      break;
    }
    case NodeKind.NEW: {
      serializeNewExpression(<NewExpression>node, sb);
      break;
    }
    case NodeKind.PARENTHESIZED: {
      serializeParenthesizedExpression(<ParenthesizedExpression>node, sb);
      break;
    }
    case NodeKind.PROPERTYACCESS: {
      serializePropertyAccessExpression(<PropertyAccessExpression>node, sb);
      break;
    }
    case NodeKind.TERNARY: {
      serializeTernaryExpression(<TernaryExpression>node, sb);
      break;
    }
    case NodeKind.UNARYPOSTFIX: {
      serializeUnaryPostfixExpression(<UnaryPostfixExpression>node, sb);
      break;
    }
    case NodeKind.UNARYPREFIX: {
      serializeUnaryPrefixExpression(<UnaryPrefixExpression>node, sb);
      break;
    }

    // statements

    case NodeKind.BLOCK: {
      serializeBlockStatement(<BlockStatement>node, sb);
      break;
    }
    case NodeKind.BREAK: {
      serializeBreakStatement(<BreakStatement>node, sb);
      break;
    }
    case NodeKind.CONTINUE: {
      serializeContinueStatement(<ContinueStatement>node, sb);
      break;
    }
    case NodeKind.DO: {
      serializeDoStatement(<DoStatement>node, sb);
      break;
    }
    case NodeKind.EMPTY: {
      serializeEmptyStatement(<EmptyStatement>node, sb);
      break;
    }
    case NodeKind.EXPORT: {
      serializeExportStatement(<ExportStatement>node, sb);
      break;
    }
    case NodeKind.EXPORTIMPORT: {
      serializeExportImportStatement(<ExportImportStatement>node, sb);
      break;
    }
    case NodeKind.EXPRESSION: {
      serializeExpressionStatement(<ExpressionStatement>node, sb);
      break;
    }
    case NodeKind.FOR: {
      serializeForStatement(<ForStatement>node, sb);
      break;
    }
    case NodeKind.IF: {
      serializeIfStatement(<IfStatement>node, sb);
      break;
    }
    case NodeKind.IMPORT: {
      serializeImportStatement(<ImportStatement>node, sb);
      break;
    }
    case NodeKind.RETURN: {
      serializeReturnStatement(<ReturnStatement>node, sb);
      break;
    }
    case NodeKind.SWITCH: {
      serializeSwitchStatement(<SwitchStatement>node, sb);
      break;
    }
    case NodeKind.THROW: {
      serializeThrowStatement(<ThrowStatement>node, sb);
      break;
    }
    case NodeKind.TRY: {
      serializeTryStatement(<TryStatement>node, sb);
      break;
    }
    case NodeKind.VARIABLE: {
      serializeVariableStatement(<VariableStatement>node, sb);
      break;
    }
    case NodeKind.WHILE: {
      serializeWhileStatement(<WhileStatement>node, sb);
      break;
    }

    // declaration statements

    case NodeKind.CLASSDECLARATION: {
      serializeClassDeclaration(<ClassDeclaration>node, sb);
      break;
    }
    case NodeKind.ENUMDECLARATION: {
      serializeEnumDeclaration(<EnumDeclaration>node, sb);
      break;
    }
    case NodeKind.ENUMVALUEDECLARATION: {
      serializeEnumValueDeclaration(<EnumValueDeclaration>node, sb);
      break;
    }
    case NodeKind.FIELDDECLARATION: {
      serializeFieldDeclaration(<FieldDeclaration>node, sb);
      break;
    }
    case NodeKind.FUNCTIONDECLARATION: {
      serializeFunctionDeclaration(<FunctionDeclaration>node, sb);
      break;
    }
    case NodeKind.IMPORTDECLARATION: {
      serializeImportDeclaration(<ImportDeclaration>node, sb);
      break;
    }
    case NodeKind.INTERFACEDECLARATION: {
      serializeInterfaceDeclaration(<InterfaceDeclaration>node, sb);
      break;
    }
    case NodeKind.METHODDECLARATION: {
      serializeMethodDeclaration(<MethodDeclaration>node, sb);
      break;
    }
    case NodeKind.NAMESPACEDECLARATION: {
      serializeNamespaceDeclaration(<NamespaceDeclaration>node, sb);
      break;
    }
    case NodeKind.TYPEDECLARATION: {
      serializeTypeDeclaration(<TypeDeclaration>node, sb);
      break;
    }
    case NodeKind.VARIABLEDECLARATION: {
      serializeVariableDeclaration(<VariableDeclaration>node, sb);
      break;
    }

    // other

    case NodeKind.DECORATOR: {
      serializeDecorator(<DecoratorNode>node, sb);
      break;
    }
    case NodeKind.EXPORTMEMBER: {
      serializeExportMember(<ExportMember>node, sb);
      break;
    }
    case NodeKind.MODIFIER: {
      serializeModifier(<ModifierNode>node, sb);
      break;
    }
    case NodeKind.PARAMETER: {
      serializeParameter(<ParameterNode>node, sb);
      break;
    }
    case NodeKind.SWITCHCASE: {
      serializeSwitchCase(<SwitchCase>node, sb);
      break;
    }
    default: {
      assert(false);
      break;
    }
  }
}

export function serializeSource(source: Source, sb: string[]): void {
  for (let i = 0, k = source.statements.length; i < k; ++i) {
    serializeTerminatedStatement(source.statements[i], sb);
  }
}

// types

export function serializeTypeNode(node: CommonTypeNode, sb: string[]): void {
  if (node.kind == NodeKind.SIGNATURE) {
    serializeSignatureNode(<SignatureNode>node, sb);
    return;
  }
  var typeNode = <TypeNode>node;
  serializeIdentifierExpression(<IdentifierExpression>typeNode.name, sb);
  if (typeNode.typeArguments) {
    let numTypeArguments = typeNode.typeArguments.length;
    if (numTypeArguments) {
      sb.push("<");
      serializeTypeNode(typeNode.typeArguments[0], sb);
      for (let i = 1; i < numTypeArguments; ++i) {
        sb.push(", ");
        serializeTypeNode(typeNode.typeArguments[i], sb);
      }
      sb.push(">");
    }
    if (node.isNullable) sb.push(" | null");
  }
}

export function serializeTypeParameter(node: TypeParameterNode, sb: string[]): void {
  serializeIdentifierExpression(node.name, sb);
  var extendsType = node.extendsType;
  if (extendsType) {
    sb.push(" extends ");
    serializeTypeNode(extendsType, sb);
  }
}

export function serializeSignatureNode(node: SignatureNode, sb: string[]): void {
  var isNullable = node.isNullable;
  sb.push(isNullable ? "((" : "(");
  var explicitThisType = node.explicitThisType;
  if (explicitThisType) {
    sb.push("this: ");
    serializeTypeNode(explicitThisType, sb);
  }
  var parameters = node.parameterTypes;
  var numParameters = parameters.length;
  if (numParameters) {
    if (explicitThisType) sb.push(", ");
    serializeParameter(parameters[0], sb);
    for (let i = 1; i < numParameters; ++i) {
      sb.push(", ");
      serializeParameter(parameters[i], sb);
    }
  }
  var returnType = node.returnType;
  if (returnType) {
    sb.push(") => ");
    serializeTypeNode(returnType, sb);
  } else {
    sb.push(") => void");
  }
  if (isNullable) sb.push(") | null");
}

// expressions

export function serializeExpression(node: Expression, sb: string[]): void {
  serializeNode(node, sb);
}

export function serializeIdentifierExpression(node: IdentifierExpression, sb: string[]): void {
  sb.push(node.text);
}

export function serializeArrayLiteralExpression(node: ArrayLiteralExpression, sb: string[]): void {
  sb.push("[");
  var elements = node.elementExpressions;
  var numElements = elements.length;
  if (numElements) {
    if (elements[0]) serializeExpression(<Expression>elements[0], sb);
    for (let i = 1; i < numElements; ++i) {
      sb.push(", ");
      if (elements[i]) serializeExpression(<Expression>elements[i], sb);
    }
  }
  sb.push("]");
}

export function serializeAssertionExpression(node: AssertionExpression, sb: string[]): void {
  if (node.assertionKind == AssertionKind.PREFIX) {
    sb.push("<");
    serializeTypeNode(node.toType, sb);
    sb.push(">");
    serializeExpression(node.expression, sb);
  } else {
    serializeExpression(node.expression, sb);
    sb.push(" as ");
    serializeTypeNode(node.toType, sb);
  }
}

export function serializeBinaryExpression(node: BinaryExpression, sb: string[]): void {
  serializeExpression(node.left, sb);
  sb.push(" ");
  sb.push(Token.operatorToString(node.operator));
  sb.push(" ");
  serializeExpression(node.right, sb);
}

export function serializeCallExpression(node: CallExpression, sb: string[]): void {
  serializeExpression(node.expression, sb);
  var i: i32, k: i32;
  if (node.typeArguments && (k = node.typeArguments.length)) {
    sb.push("<");
    serializeTypeNode(node.typeArguments[0], sb);
    for (i = 1; i < k; ++i) {
      sb.push(", ");
      serializeTypeNode(node.typeArguments[i], sb);
    }
    sb.push(">(");
  } else {
    sb.push("(");
  }
  if (k = node.arguments.length) {
    serializeExpression(node.arguments[0], sb);
    for (i = 1; i < k; ++i) {
      sb.push(", ");
      serializeExpression(node.arguments[i], sb);
    }
  }
  sb.push(")");
}

export function serializeCommaExpression(node: CommaExpression, sb: string[]): void {
  var expressions = node.expressions;
  var numExpressions = assert(expressions.length);
  serializeExpression(expressions[0], sb);
  for (let i = 1; i < numExpressions; ++i) {
    sb.push(",");
    serializeExpression(expressions[i], sb);
  }
}

export function serializeElementAccessExpression(node: ElementAccessExpression, sb: string[]): void {
  serializeExpression(node.expression, sb);
  sb.push("[");
  serializeExpression(node.elementExpression, sb);
  sb.push("]");
}

export function serializeFunctionExpression(node: FunctionExpression, sb: string[]): void {
  var declaration = node.declaration;
  var isArrow = node.kind == NodeKind.FUNCTIONARROW;
  if (!isArrow) {
    if (declaration.name.text.length) {
      sb.push("function ");
    } else {
      sb.push("function");
    }
  } else {
    assert(declaration.name.text.length == 0);
  }
  serializeFunctionCommon(declaration, sb, isArrow);
}

export function serializeLiteralExpression(node: LiteralExpression, sb: string[]): void {
  switch (node.literalKind) {
    case LiteralKind.FLOAT: {
      serializeFloatLiteralExpression(<FloatLiteralExpression>node, sb);
      break;
    }
    case LiteralKind.INTEGER: {
      serializeIntegerLiteralExpression(<IntegerLiteralExpression>node, sb);
      break;
    }
    case LiteralKind.STRING: {
      serializeStringLiteralExpression(<StringLiteralExpression>node, sb);
      break;
    }
    case LiteralKind.REGEXP: {
      serializeRegexpLiteralExpression(<RegexpLiteralExpression>node, sb);
      break;
    }
    case LiteralKind.ARRAY: {
      serializeArrayLiteralExpression(<ArrayLiteralExpression>node, sb);
      break;
    }
    // case LiteralKind.OBJECT: {
    //   serializeObjectLiteralExpression(<ObjectLiteralExpression>node, sb);
    //   break;
    // }
    default: {
      assert(false);
      break;
    }
  }
}

export function serializeFloatLiteralExpression(node: FloatLiteralExpression, sb: string[]): void {
  sb.push(node.value.toString(10));
}

export function serializeIntegerLiteralExpression(node: IntegerLiteralExpression, sb: string[]): void {
  sb.push(node.value.toString());
}

export function serializeStringLiteral(str: string, sb: string[], singleQuoted: bool = false): void {
  var off = 0;
  var quote = singleQuoted ? "'" : "\"";
  sb.push(quote);
  var i = 0;
  for (let k = str.length; i < k;) {
    switch (str.charCodeAt(i)) {
      case CharCode.NULL: {
        if (i > off) sb.push(str.substring(off, off = i + 1));
        sb.push("\\0");
        off = ++i;
        break;
      }
      case CharCode.BACKSPACE: {
        if (i > off) sb.push(str.substring(off, i));
        off = ++i;
        sb.push("\\b");
        break;
      }
      case CharCode.TAB: {
        if (i > off) sb.push(str.substring(off, i));
        off = ++i;
        sb.push("\\t");
        break;
      }
      case CharCode.LINEFEED: {
        if (i > off) sb.push(str.substring(off, i));
        off = ++i;
        sb.push("\\n");
        break;
      }
      case CharCode.VERTICALTAB: {
        if (i > off) sb.push(str.substring(off, i));
        off = ++i;
        sb.push("\\v");
        break;
      }
      case CharCode.FORMFEED: {
        if (i > off) sb.push(str.substring(off, i));
        off = ++i;
        sb.push("\\f");
        break;
      }
      case CharCode.CARRIAGERETURN: {
        if (i > off) sb.push(str.substring(off, i));
        sb.push("\\r");
        off = ++i;
        break;
      }
      case CharCode.DOUBLEQUOTE: {
        if (!singleQuoted) {
          if (i > off) sb.push(str.substring(off, i));
          sb.push("\\\"");
          off = ++i;
        } else {
          ++i;
        }
        break;
      }
      case CharCode.SINGLEQUOTE: {
        if (singleQuoted) {
          if (i > off) sb.push(str.substring(off, i));
          sb.push("\\'");
          off = ++i;
        } else {
          ++i;
        }
        break;
      }
      case CharCode.BACKSLASH: {
        if (i > off) sb.push(str.substring(off, i));
        sb.push("\\\\");
        off = ++i;
        break;
      }
      default: {
        ++i;
        break;
      }
    }
  }
  if (i > off) sb.push(str.substring(off, i));
  sb.push(quote);
}

export function serializeStringLiteralExpression(node: StringLiteralExpression, sb: string[]): void {
  serializeStringLiteral(node.value, sb);
}

export function serializeRegexpLiteralExpression(node: RegexpLiteralExpression, sb: string[]): void {
  sb.push("/");
  sb.push(node.pattern);
  sb.push("/");
  sb.push(node.patternFlags);
}

export function serializeNewExpression(node: NewExpression, sb: string[]): void {
  sb.push("new ");
  serializeCallExpression(node, sb);
}

export function serializeParenthesizedExpression(node: ParenthesizedExpression, sb: string[]): void {
  sb.push("(");
  serializeExpression(node.expression, sb);
  sb.push(")");
}

export function serializePropertyAccessExpression(node: PropertyAccessExpression, sb: string[]): void {
  serializeExpression(node.expression, sb);
  sb.push(".");
  serializeIdentifierExpression(node.property, sb);
}

export function serializeTernaryExpression(node: TernaryExpression, sb: string[]): void {
  serializeExpression(node.condition, sb);
  sb.push(" ? ");
  serializeExpression(node.ifThen, sb);
  sb.push(" : ");
  serializeExpression(node.ifElse, sb);
}

export function serializeUnaryExpression(node: UnaryExpression, sb: string[]): void {
  switch (node.kind) {
    case NodeKind.UNARYPOSTFIX: {
      serializeUnaryPostfixExpression(<UnaryPostfixExpression>node, sb);
      break;
    }
    case NodeKind.UNARYPREFIX: {
      serializeUnaryPrefixExpression(<UnaryPrefixExpression>node, sb);
      break;
    }
    default: assert(false);
  }
}

export function serializeUnaryPostfixExpression(node: UnaryPostfixExpression, sb: string[]): void {
  serializeExpression(node.operand, sb);
  sb.push(Token.operatorToString(node.operator));
}

export function serializeUnaryPrefixExpression(node: UnaryPrefixExpression, sb: string[]): void {
  sb.push(Token.operatorToString(node.operator));
  serializeExpression(node.operand, sb);
}

// statements

export function serializeStatement(node: Statement, sb: string[]): void {
  serializeNode(node, sb);
}

function serializeTerminatedStatement(statement: Statement, sb: string[]): void {
  serializeStatement(statement, sb);
  if (
    !sb.length ||                          // leading EmptyStatement
    statement.kind == NodeKind.VARIABLE || // potentially assigns a FunctionExpression
    statement.kind == NodeKind.EXPRESSION  // potentially assigns a FunctionExpression
  ) {
    sb.push(";\n");
  } else {
    let last = sb[sb.length - 1];
    if (last.length && last.charCodeAt(last.length - 1) == CharCode.CLOSEBRACE) {
      sb.push("\n");
    } else {
      sb.push(";\n");
    }
  }
}

export function serializeBlockStatement(node: BlockStatement, sb: string[]): void {
  var statements = node.statements;
  sb.push("{\n");
  for (let i = 0, k = statements.length; i < k; ++i) {
    serializeTerminatedStatement(statements[i], sb);
  }
  sb.push("}");
}

export function serializeBreakStatement(node: BreakStatement, sb: string[]): void {
  var label = node.label;
  if (label) {
    sb.push("break ");
    serializeIdentifierExpression(label, sb);
  } else {
    sb.push("break");
  }
}

export function serializeContinueStatement(node: ContinueStatement, sb: string[]): void {
  var label = node.label;
  if (label) {
    sb.push("continue ");
    serializeIdentifierExpression(label, sb);
  } else {
    sb.push("continue");
  }
}

export function serializeClassDeclaration(node: ClassDeclaration, sb: string[]): void {
  var decorators = node.decorators;
  if (decorators) {
    for (let i = 0, k = decorators.length; i < k; ++i) {
      serializeDecorator(decorators[i], sb);
      sb.push("\n");
    }
  }
  var modifiers = node.modifiers;
  if (modifiers) {
    for (let i = 0, k = modifiers.length; i < k; ++i) {
      serializeModifier(modifiers[i], sb);
      sb.push(" ");
    }
  }
  sb.push("class ");
  serializeIdentifierExpression(node.name, sb);
  var typeParameters = node.typeParameters;
  var numTypeParameters = typeParameters.length;
  if (numTypeParameters) {
    sb.push("<");
    serializeTypeParameter(typeParameters[0], sb);
    for (let i = 1; i < numTypeParameters; ++i) {
      sb.push(", ");
      serializeTypeParameter(node.typeParameters[i], sb);
    }
    sb.push(">");
  }
  var extendsType = node.extendsType;
  if (extendsType) {
    sb.push(" extends ");
    serializeTypeNode(extendsType, sb);
  }
  var implementsTypes = node.implementsTypes;
  var numImplementsTypes = implementsTypes.length;
  if (numImplementsTypes) {
    sb.push(" implements ");
    serializeTypeNode(implementsTypes[0], sb);
    for (let i = 1; i < numImplementsTypes; ++i) {
      sb.push(", ");
      serializeTypeNode(implementsTypes[i], sb);
    }
  }
  sb.push(" {\n");
  var members = node.members;
  for (let i = 0, k = members.length; i < k; ++i) {
    serializeTerminatedStatement(members[i], sb);
  }
  sb.push("}");
}

export function serializeDoStatement(node: DoStatement, sb: string[]): void {
  sb.push("do ");
  serializeStatement(node.statement, sb);
  if (node.statement.kind == NodeKind.BLOCK) {
    sb.push(" while (");
  } else {
    sb.push(";\nwhile (");
  }
  serializeExpression(node.condition, sb);
  sb.push(")");
}

export function serializeEmptyStatement(node: EmptyStatement, sb: string[]): void {
}

export function serializeEnumDeclaration(node: EnumDeclaration, sb: string[]): void {
  var i: i32, k: i32;
  if (node.modifiers) {
    for (i = 0, k = node.modifiers.length; i < k; ++i) {
      serializeModifier(node.modifiers[i], sb);
      sb.push(" ");
    }
  }
  sb.push("enum ");
  serializeIdentifierExpression(node.name, sb);
  if (k = node.values.length) {
    sb.push(" {\n");
    serializeEnumValueDeclaration(node.values[0], sb);
    for (i = 1; i < k; ++i) {
      sb.push(",\n");
      serializeEnumValueDeclaration(node.values[i], sb);
    }
    sb.push("\n}");
  } else {
    sb.push(" {\n}");
  }
}

export function serializeEnumValueDeclaration(node: EnumValueDeclaration, sb: string[]): void {
  serializeIdentifierExpression(node.name, sb);
  if (node.value) {
    sb.push(" = ");
    serializeExpression(node.value, sb);
  }
}

export function serializeExportImportStatement(node: ExportImportStatement, sb: string[]): void {
  sb.push("export import ");
  serializeIdentifierExpression(node.externalName, sb);
  sb.push(" = ");
  serializeIdentifierExpression(node.name, sb);
}

export function serializeExportMember(node: ExportMember, sb: string[]): void {
  serializeIdentifierExpression(node.name, sb);
  if (node.externalName.text != node.name.text) {
    sb.push(" as ");
    serializeIdentifierExpression(node.externalName, sb);
  }
}

export function serializeExportStatement(node: ExportStatement, sb: string[]): void {
  var i: i32, k: i32;
  if (node.modifiers) {
    for (i = 0, k = node.modifiers.length; i < k; ++i) {
      serializeModifier(node.modifiers[i], sb);
      sb.push(" ");
    }
  }
  if (k = node.members.length) {
    sb.push("export {\n");
    serializeExportMember(node.members[0], sb);
    for (i = 1; i < k; ++i) {
      sb.push(",\n");
      serializeExportMember(node.members[i], sb);
    }
    sb.push("\n}");
  } else {
    sb.push("export {}");
  }
  if (node.path) {
    sb.push(" from ");
    serializeStringLiteralExpression(node.path, sb);
  }
}

export function serializeExpressionStatement(node: ExpressionStatement, sb: string[]): void {
  serializeExpression(node.expression, sb);
}

export function serializeFieldDeclaration(node: FieldDeclaration, sb: string[]): void {
  var i: i32, k: i32;
  if (node.decorators) {
    for (i = 0, k = node.decorators.length; i < k; ++i) {
      serializeDecorator(node.decorators[i], sb);
      sb.push("\n");
    }
  }
  if (node.modifiers) {
    for (i = 0, k = node.modifiers.length; i < k; ++i) {
      serializeModifier(node.modifiers[i], sb);
      sb.push(" ");
    }
  }
  serializeIdentifierExpression(node.name, sb);
  if (node.type) {
    sb.push(": ");
    serializeTypeNode(node.type, sb);
  }
  if (node.initializer) {
    sb.push(" = ");
    serializeExpression(node.initializer, sb);
  }
}

export function serializeForStatement(node: ForStatement, sb: string[]): void {
  sb.push("for (");
  if (node.initializer) {
    serializeStatement(node.initializer, sb);
  }
  if (node.condition) {
    sb.push("; ");
    serializeExpression(node.condition, sb);
  } else {
    sb.push(";");
  }
  if (node.incrementor) {
    sb.push("; ");
    serializeExpression(node.incrementor, sb);
  } else {
    sb.push(";");
  }
  sb.push(") ");
  serializeStatement(node.statement, sb);
}

export function serializeFunctionDeclaration(node: FunctionDeclaration, sb: string[]): void {
  var i: i32, k: i32;
  if (node.decorators) {
    for (i = 0, k = node.decorators.length; i < k; ++i) {
      serializeDecorator(node.decorators[i], sb);
      sb.push("\n");
    }
  }
  if (node.modifiers) {
    for (i = 0, k = node.modifiers.length; i < k; ++i) {
      serializeModifier(node.modifiers[i], sb);
      sb.push(" ");
    }
  }
  if (node.name.text.length) {
    sb.push("function ");
  } else {
    sb.push("function");
  }
  serializeFunctionCommon(node, sb);
}

function serializeFunctionCommon(node: FunctionDeclaration, sb: string[], isArrow: bool = false): void {
  var i: i32, k: i32;
  serializeIdentifierExpression(node.name, sb);
  var signature = node.signature;
  if (node.typeParameters) {
    if (k = node.typeParameters.length) {
      sb.push("<");
      serializeTypeParameter(node.typeParameters[0], sb);
      for (i = 1; i < k; ++i) {
        sb.push(", ");
        serializeTypeParameter(node.typeParameters[i], sb);
      }
      sb.push(">");
    }
  }
  sb.push("(");
  if (k = signature.parameterTypes.length) {
    serializeParameter(signature.parameterTypes[0], sb);
    for (i = 1; i < k; ++i) {
      sb.push(", ");
      serializeParameter(signature.parameterTypes[i], sb);
    }
  }
  if (isArrow) {
    if (node.body) {
      if (signature.returnType) {
        sb.push("): ");
        serializeTypeNode(signature.returnType, sb);
      }
      sb.push(" => ");
      serializeStatement(node.body, sb);
    } else {
      if (signature.returnType) {
        sb.push(" => ");
        serializeTypeNode(signature.returnType, sb);
      } else {
        sb.push(" => void");
      }
    }
  } else {
    if (signature.returnType && !hasModifier(ModifierKind.SET, node.modifiers)) {
      sb.push("): ");
      serializeTypeNode(signature.returnType, sb);
    } else {
      // TODO: constructor?
      sb.push(")");
    }
    if (node.body) {
      sb.push(" ");
      serializeStatement(node.body, sb);
    }
  }
}

export function serializeIfStatement(node: IfStatement, sb: string[]): void {
  sb.push("if (");
  serializeExpression(node.condition, sb);
  sb.push(") ");
  var ifTrue = node.ifTrue;
  serializeStatement(ifTrue, sb);
  if (ifTrue.kind != NodeKind.BLOCK) {
    sb.push(";\n");
  }
  var ifFalse = node.ifFalse;
  if (ifFalse) {
    if (ifTrue.kind == NodeKind.BLOCK) {
      sb.push(" else ");
    } else {
      sb.push("else ");
    }
    serializeStatement(ifFalse, sb);
  }
}

export function serializeImportDeclaration(node: ImportDeclaration, sb: string[]): void {
  var externalName = node.externalName;
  var name = node.name;
  serializeIdentifierExpression(externalName, sb);
  if (externalName.text != name.text) {
    sb.push(" as ");
    serializeIdentifierExpression(name, sb);
  }
}

export function serializeImportStatement(node: ImportStatement, sb: string[]): void {
  sb.push("import ");
  var declarations = node.declarations;
  var namespaceName = node.namespaceName;
  if (declarations) {
    let numDeclarations = declarations.length;
    if (numDeclarations) {
      sb.push("{\n");
      serializeImportDeclaration(declarations[0], sb);
      for (let i = 1; i < numDeclarations; ++i) {
        sb.push(",\n");
        serializeImportDeclaration(declarations[i], sb);
      }
      sb.push("\n} from ");
    } else {
      sb.push("{} from ");
    }
  } else if (namespaceName) {
    sb.push("* as ");
    serializeIdentifierExpression(namespaceName, sb);
    sb.push(" from ");
  }
  serializeStringLiteralExpression(node.path, sb);
}

export function serializeInterfaceDeclaration(node: InterfaceDeclaration, sb: string[]): void {
  var decorators = node.decorators;
  if (decorators) {
    for (let i = 0, k = decorators.length; i < k; ++i) {
      serializeDecorator(decorators[i], sb);
      sb.push("\n");
    }
  }
  var modifiers = node.modifiers;
  if (modifiers) {
    for (let i = 0, k = modifiers.length; i < k; ++i) {
      serializeModifier(modifiers[i], sb);
      sb.push(" ");
    }
  }
  sb.push("interface ");
  serializeIdentifierExpression(node.name, sb);
  var typeParameters = node.typeParameters;
  var numTypeParameters = typeParameters.length;
  if (numTypeParameters) {
    sb.push("<");
    serializeTypeParameter(node.typeParameters[0], sb);
    for (let i = 0; i < numTypeParameters; ++i) {
      sb.push(", ");
      serializeTypeParameter(node.typeParameters[i], sb);
    }
    sb.push(">");
  }
  var extendsType = node.extendsType;
  if (extendsType) {
    sb.push(" extends ");
    serializeTypeNode(extendsType, sb);
  }
  sb.push(" {\n");
  var members = node.members;
  for (let i = 0, k = members.length; i < k; ++i) {
    serializeTerminatedStatement(members[i], sb);
  }
  sb.push("}");
}

export function serializeMethodDeclaration(node: MethodDeclaration, sb: string[]): void {
  var decorators = node.decorators;
  if (decorators) {
    for (let i = 0, k = decorators.length; i < k; ++i) {
      serializeDecorator(decorators[i], sb);
      sb.push("\n");
    }
  }
  var modifiers = node.modifiers;
  if (modifiers) {
    for (let i = 0, k = modifiers.length; i < k; ++i) {
      serializeModifier(modifiers[i], sb);
      sb.push(" ");
    }
  }
  serializeFunctionCommon(node, sb);
}

export function serializeNamespaceDeclaration(node: NamespaceDeclaration, sb: string[]): void {
  var decorators = node.decorators;
  if (decorators) {
    for (let i = 0, k = decorators.length; i < k; ++i) {
      serializeDecorator(decorators[i], sb);
      sb.push("\n");
    }
  }
  var modifiers = node.modifiers;
  if (modifiers) {
    for (let i = 0, k = modifiers.length; i < k; ++i) {
      serializeModifier(modifiers[i], sb);
      sb.push(" ");
    }
  }
  sb.push("namespace ");
  serializeIdentifierExpression(node.name, sb);
  sb.push(" {\n");
  var members = node.members;
  for (let i = 0, k = members.length; i < k; ++i) {
    serializeTerminatedStatement(members[i], sb);
  }
  sb.push("}");
}

export function serializeReturnStatement(node: ReturnStatement, sb: string[]): void {
  var value = node.value;
  if (value) {
    sb.push("return ");
    serializeExpression(value, sb);
  } else {
    sb.push("return");
  }
}

export function serializeSwitchCase(node: SwitchCase, sb: string[]): void {
  var label = node.label;
  if (label) {
    sb.push("case ");
    serializeExpression(label, sb);
    sb.push(":\n");
  } else {
    sb.push("default:\n");
  }
  var statements = node.statements;
  var numStatements = statements.length;
  if (numStatements) {
    serializeTerminatedStatement(statements[0], sb);
    for (let i = 1; i < numStatements; ++i) {
      sb.push("\n");
      serializeTerminatedStatement(statements[i], sb);
    }
  }
}

export function serializeSwitchStatement(node: SwitchStatement, sb: string[]): void {
  sb.push("switch (");
  serializeExpression(node.condition, sb);
  sb.push(") {\n");
  var cases = node.cases;
  for (let i = 0, k = cases.length; i < k; ++i) {
    serializeSwitchCase(cases[i], sb);
    sb.push("\n");
  }
  sb.push("}");
}

export function serializeThrowStatement(node: ThrowStatement, sb: string[]): void {
  sb.push("throw ");
  serializeExpression(node.value, sb);
  sb.push(";");
}

export function serializeTryStatement(node: TryStatement, sb: string[]): void {
  sb.push("try {\n");
  var statements = node.statements;
  for (let i = 0, k = statements.length; i < k; ++i) {
    serializeStatement(statements[i], sb);
    sb.push(";\n");
  }
  var catchVariable = node.catchVariable;
  if (catchVariable) {
    sb.push("} catch (");
    serializeIdentifierExpression(catchVariable, sb);
    sb.push(") {\n");
    let catchStatements = node.catchStatements;
    if (catchStatements) {
      for (let i = 0, k = catchStatements.length; i < k; ++i) {
        serializeStatement(catchStatements[i], sb);
        sb.push(";\n");
      }
    }
  }
  var finallyStatements = node.finallyStatements;
  if (finallyStatements) {
    sb.push("} finally {\n");
    for (let i = 0, k = finallyStatements.length; i < k; ++i) {
      serializeStatement(finallyStatements[i], sb);
      sb.push(";\n");
    }
  }
  sb.push("}");
}

export function serializeTypeDeclaration(node: TypeDeclaration, sb: string[]): void {
  var decorators = node.decorators;
  if (decorators) {
    for (let i = 0, k = decorators.length; i < k; ++i) {
      serializeDecorator(decorators[i], sb);
      sb.push("\n");
    }
  }
  var modifiers = node.modifiers;
  if (modifiers) {
    for (let i = 0, k = modifiers.length; i < k; ++i) {
      serializeModifier(modifiers[i], sb);
      sb.push(" ");
    }
  }
  sb.push("type ");
  serializeIdentifierExpression(node.name, sb);
  var typeParameters = node.typeParameters;
  if (typeParameters) {
    let numTypeParameters = typeParameters.length;
    if (numTypeParameters) {
      sb.push("<");
      for (let i = 0; i < numTypeParameters; ++i) {
        serializeTypeParameter(typeParameters[i], sb);
      }
      sb.push(">");
    }
  }
  sb.push(" = ");
  serializeTypeNode(node.type, sb);
}

export function serializeVariableDeclaration(node: VariableDeclaration, sb: string[]): void {
  serializeIdentifierExpression(node.name, sb);
  var type = node.type;
  if (type) {
    sb.push(": ");
    serializeTypeNode(type, sb);
  }
  var initializer = node.initializer;
  if (initializer) {
    sb.push(" = ");
    serializeExpression(initializer, sb);
  }
}

export function serializeVariableStatement(node: VariableStatement, sb: string[]): void {
  var decorators = node.decorators;
  if (decorators) {
    for (let i = 0, k = decorators.length; i < k; ++i) {
      serializeDecorator(decorators[i], sb);
      sb.push("\n");
    }
  }
  var isConst = false, isLet = false;
  var modifiers = node.modifiers;
  if (modifiers) {
    for (let i = 0, k = modifiers.length; i < k; ++i) {
      let modifier = modifiers[i];
      switch (modifier.modifierKind) {
        case ModifierKind.CONST: {
          assert(!isLet);
          isConst = true;
          break;
        }
        case ModifierKind.LET: {
          assert(!isConst);
          isLet = true;
          break;
        }
        default: {
          serializeModifier(modifier, sb);
          sb.push(" ");
          break;
        }
      }
    }
  }
  sb.push(isConst ? "const " : isLet ? "let " : "var ");
  var declarations = node.declarations;
  var numDeclarations = assert(declarations.length);
  serializeVariableDeclaration(node.declarations[0], sb);
  for (let i = 1; i < numDeclarations; ++i) {
    sb.push(", ");
    serializeVariableDeclaration(node.declarations[i], sb);
  }
}

export function serializeWhileStatement(node: WhileStatement, sb: string[]): void {
  sb.push("while (");
  serializeExpression(node.condition, sb);
  sb.push(") ");
  serializeStatement(node.statement, sb);
}

// other

export function serializeDecorator(node: DecoratorNode, sb: string[]): void {
  sb.push("@");
  serializeExpression(node.name, sb);
  var args = node.arguments;
  if (args) {
    sb.push("(");
    let numArgs = args.length;
    if (numArgs) {
      serializeExpression(args[0], sb);
      for (let i = 1; i < numArgs; ++i) {
        sb.push(", ");
        serializeExpression(args[i], sb);
      }
    }
    sb.push(")");
  }
}

export function serializeModifier(node: ModifierNode, sb: string[]): void {
  sb.push(modifierToString(node));
}

export function serializeParameter(node: ParameterNode, sb: string[]): void {
  var kind = node.parameterKind;
  if (kind == ParameterKind.REST) {
    sb.push("...");
  }
  serializeIdentifierExpression(node.name, sb);
  var type = node.type;
  var initializer = node.initializer;
  if (type) {
    if (kind == ParameterKind.OPTIONAL && !initializer) {
      sb.push("?: ");
    } else {
      sb.push(": ");
    }
    serializeTypeNode(type, sb);
  }
  if (initializer) {
    sb.push(" = ");
    serializeExpression(initializer, sb);
  }
}

// helpers

export function modifierToString(node: ModifierNode): string {
  switch (node.modifierKind) {
    case ModifierKind.ASYNC: return "async";
    case ModifierKind.CONST: return "const";
    case ModifierKind.LET: return "let"; // unused
    case ModifierKind.DECLARE: return "declare";
    case ModifierKind.EXPORT: return "export";
    case ModifierKind.IMPORT: return "import";
    case ModifierKind.STATIC: return "static";
    case ModifierKind.ABSTRACT: return "abstract";
    case ModifierKind.PUBLIC: return "public";
    case ModifierKind.PRIVATE: return "private";
    case ModifierKind.PROTECTED: return "protected";
    case ModifierKind.READONLY: return "readonly";
    case ModifierKind.GET: return "get";
    case ModifierKind.SET: return "set";
    default: {
      assert(false);
      return "";
    }
  }
}
