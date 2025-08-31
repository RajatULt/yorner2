export interface WishlistItem {
  id: string;
  name: string;
  type: 'cruise' | 'hotel';
  price: number;
  image: string;
  priority: 'Low' | 'Medium' | 'High';
  notes: string;
  addedDate: string;
}

export interface WishlistStats {
  totalItems: number;
  cruises: number;
  hotels: number;
  averagePrice: number;
  totalValue: number;
}

class WishlistService {
  private storageKey = 'yorker_holidays_wishlist';

  // Get all wishlist items
  getWishlist(): WishlistItem[] {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading wishlist:', error);
      return [];
    }
  }

  // Add item to wishlist
  async addToWishlist(item: Omit<WishlistItem, 'addedDate'>): Promise<void> {
    try {
      const wishlist = this.getWishlist();
      
      // Check if item already exists
      if (wishlist.some(w => w.id === item.id)) {
        throw new Error('Item already in wishlist');
      }

      const newItem: WishlistItem = {
        ...item,
        addedDate: new Date().toISOString()
      };

      wishlist.push(newItem);
      localStorage.setItem(this.storageKey, JSON.stringify(wishlist));
    } catch (error) {
      throw new Error('Failed to add to wishlist');
    }
  }

  // Remove item from wishlist
  async removeFromWishlist(itemId: string): Promise<void> {
    try {
      const wishlist = this.getWishlist();
      const filtered = wishlist.filter(item => item.id !== itemId);
      localStorage.setItem(this.storageKey, JSON.stringify(filtered));
    } catch (error) {
      throw new Error('Failed to remove from wishlist');
    }
  }

  // Check if item is in wishlist
  async isInWishlist(itemId: string): Promise<boolean> {
    const wishlist = this.getWishlist();
    return wishlist.some(item => item.id === itemId);
  }

  // Update item priority
  async updatePriority(itemId: string, priority: 'Low' | 'Medium' | 'High'): Promise<void> {
    try {
      const wishlist = this.getWishlist();
      const itemIndex = wishlist.findIndex(item => item.id === itemId);
      
      if (itemIndex === -1) {
        throw new Error('Item not found in wishlist');
      }

      wishlist[itemIndex].priority = priority;
      localStorage.setItem(this.storageKey, JSON.stringify(wishlist));
    } catch (error) {
      throw new Error('Failed to update priority');
    }
  }

  // Update item notes
  async updateNotes(itemId: string, notes: string): Promise<void> {
    try {
      const wishlist = this.getWishlist();
      const itemIndex = wishlist.findIndex(item => item.id === itemId);
      
      if (itemIndex === -1) {
        throw new Error('Item not found in wishlist');
      }

      wishlist[itemIndex].notes = notes;
      localStorage.setItem(this.storageKey, JSON.stringify(wishlist));
    } catch (error) {
      throw new Error('Failed to update notes');
    }
  }

  // Get wishlist statistics
  getWishlistStats(): WishlistStats {
    const wishlist = this.getWishlist();
    
    const cruises = wishlist.filter(item => item.type === 'cruise').length;
    const hotels = wishlist.filter(item => item.type === 'hotel').length;
    const totalValue = wishlist.reduce((sum, item) => sum + item.price, 0);
    const averagePrice = wishlist.length > 0 ? totalValue / wishlist.length : 0;

    return {
      totalItems: wishlist.length,
      cruises,
      hotels,
      averagePrice,
      totalValue
    };
  }

  // Clear entire wishlist
  async clearWishlist(): Promise<void> {
    try {
      localStorage.removeItem(this.storageKey);
    } catch (error) {
      throw new Error('Failed to clear wishlist');
    }
  }

  // Get items by priority
  getItemsByPriority(priority: 'Low' | 'Medium' | 'High'): WishlistItem[] {
    return this.getWishlist().filter(item => item.priority === priority);
  }

  // Get items by type
  getItemsByType(type: 'cruise' | 'hotel'): WishlistItem[] {
    return this.getWishlist().filter(item => item.type === type);
  }
}

export const wishlistService = new WishlistService();