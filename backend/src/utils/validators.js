const { body } = require('express-validator');

const projectValidators = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('category').isIn(['devops', 'cloud', 'cicd', 'monitoring', 'automation', 'security']).withMessage('Invalid category'),
  body('status').isIn(['completed', 'in-progress', 'planned']).withMessage('Invalid status'),
  body('technologies').isArray().withMessage('Technologies must be an array'),
  body('repository').optional().isURL().withMessage('Invalid repository URL')
];

const certificationValidators = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('issuer').trim().notEmpty().withMessage('Issuer is required'),
  body('issueDate').isISO8601().withMessage('Invalid issue date'),
  body('expirationDate').optional().isISO8601().withMessage('Invalid expiration date'),
  body('credentialUrl').optional().isURL().withMessage('Invalid credential URL')
];

const contactValidators = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').trim().notEmpty().withMessage('Phone is required'),
  body('message').trim().notEmpty().withMessage('Message is required'),
  body('purpose').isIn(['project', 'consultation', 'freelance', 'collaboration', 'other']).withMessage('Invalid purpose')
];

const blogValidators = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('slug').trim().notEmpty().withMessage('Slug is required'),
  body('excerpt').trim().notEmpty().withMessage('Excerpt is required'),
  body('content').trim().notEmpty().withMessage('Content is required'),
  body('author.name').trim().notEmpty().withMessage('Author name is required')
];

module.exports = {
  projectValidators,
  certificationValidators,
  contactValidators,
  blogValidators
};