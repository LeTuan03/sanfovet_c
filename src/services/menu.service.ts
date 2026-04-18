import { BaseService } from './base.service';
import { NavMenu } from '@/types';

export class MenuService extends BaseService<NavMenu> {
  constructor() {
    super('menus');
  }

  async getByPosition(position: 'header' | 'footer' | 'both'): Promise<NavMenu[]> {
    const snapshot = await this.collection
      .where('status', '==', true)
      .orderBy('order', 'asc')
      .get();
    
    let menus = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }) as unknown as NavMenu);
    
    if (position !== 'both') {
      menus = menus.filter(m => m.position === position || m.position === 'both');
    }
    
    return menus;
  }
}

export const menuService = new MenuService();
