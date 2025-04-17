from rest_framework.permissions import BasePermission

class PermissaoAutomatica(BasePermission):
    """Permissão que permite apenas superusuários ou usuários com permissões atribuídas no grupo"""

    def has_permission(self, request, view):
        if request.user.is_superuser or request.user.is_staff:
            return True  # Sempre permitir para administradores

        # Verifica se o usuário tem qualquer permissão necessária
        permissoes_necessarias = getattr(view, "required_permissions", [])
        return any(request.user.has_perm(permissao) for permissao in permissoes_necessarias)
